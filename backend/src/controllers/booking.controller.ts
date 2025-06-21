import { RequestHandler } from "express";
import prisma from "../config/db";
import {
  bookingCreateSchema,
  bookingUpdateSchema,
  availabilitySchema,
} from "../validation/booking.zod";

/* ─── helper: room availability ------------------------------------------- */
const isRoomAvailable = async (
  roomId: number,
  from: Date,
  to: Date,
  excludeId?: number
) => {
  // 1) Room status must be AVAILABLE
  const room = await prisma.room.findUnique({ where: { id: roomId } });
  if (!room || room.status !== "AVAILABLE") return false;

  // 2) No overlapping bookings
  const overlap = await prisma.booking.findFirst({
    where: {
      roomId,
      id: excludeId ? { not: excludeId } : undefined,
      status: { in: ["BOOKED", "CHECKED_IN"] },
      AND: [{ checkInDate: { lt: to } }, { checkOutDate: { gt: from } }],
    },
  });
  return !overlap;
};

/* ─── CRUD ────────────────────────────────────────────────────── */
export const listBookings: RequestHandler = async (_req, res, next) => {
  try {
    const data = await prisma.booking.findMany({
      include: { guest: true, room: true },
    });
    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const getBooking: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: Number(req.params.id) },
      include: { guest: true, room: true },
    });
    if (!booking) return res.status(404).json({ message: "Not found" });
    res.json(booking);
  } catch (e) {
    next(e);
  }
};

/* ─── CREATE BOOKING ------------------------------------------------------ */
export const createBooking: RequestHandler = async (req, res, next) => {
  const parsed = bookingCreateSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });

  const { roomId, checkInDate, checkOutDate } = parsed.data;

  try {
    if (!(await isRoomAvailable(roomId, checkInDate, checkOutDate)))
      return res.status(409).json({ message: "Room is not available" });

    // Do both operations atomically
    const [booking] = await prisma.$transaction([
      prisma.booking.create({
        data: parsed.data,
        include: { guest: true, room: true },
      }),
      prisma.room.update({
        where: { id: roomId },
        data: { status: "BOOKED" },
      }),
    ]);

    res.status(201).json(booking);
  } catch (e) {
    next(e);
  }
};
export const updateBooking: RequestHandler = async (req, res, next) => {
  const parsed = bookingUpdateSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });

  const { id, roomId, checkInDate, checkOutDate, ...rest } = parsed.data;

  try {
    if (roomId && checkInDate && checkOutDate) {
      if (!(await isRoomAvailable(roomId, checkInDate, checkOutDate, id)))
        return res.status(409).json({ message: "Room not available" });
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: { roomId, checkInDate, checkOutDate, ...rest },
      include: { guest: true, room: true },
    });
    res.json(booking);
  } catch (e) {
    next(e);
  }
};

export const deleteBooking: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    await prisma.booking.delete({ where: { id: Number(req.params.id) } });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

/* ─── Status actions ──────────────────────────────────────────── */
export const checkIn: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const updated = await prisma.booking.update({
      where: { id: Number(req.params.id) },
      data: { status: "CHECKED_IN" },
    });
    res.json(updated);
  } catch (e) {
    next(e);
  }
};

/* ─── CHECK-OUT ----------------------------------------------------------- */
export const checkOut: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  const bookingId = Number(req.params.id);

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const [updated] = await prisma.$transaction([
      prisma.booking.update({
        where: { id: bookingId },
        data: { status: "CHECKED_OUT" },
      }),
      prisma.room.update({
        where: { id: booking.roomId },
        data: { status: "MAINTENANCE" },
      }),
    ]);

    res.json(updated);
  } catch (e) {
    next(e);
  }
};

/* ─── Real-time availability ───────────────────────────────────── */
export const availability: RequestHandler = async (req, res, next) => {
  const parsed = availabilitySchema.safeParse(req.query);
  if (!parsed.success)
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });

  try {
    const { roomId, checkIn, checkOut } = parsed.data;
    const free = await isRoomAvailable(roomId, checkIn, checkOut);
    res.json({ available: free });
  } catch (e) {
    next(e);
  }
};

/* ─── CANCEL BOOKING (optional) ------------------------------------------ */
export const cancelBooking: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  const bookingId = Number(req.params.id);

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const [updated] = await prisma.$transaction([
      prisma.booking.update({
        where: { id: bookingId },
        data: { status: "CANCELLED" },
      }),
      prisma.room.update({
        where: { id: booking.roomId },
        data: { status: "AVAILABLE" },
      }),
    ]);

    res.json(updated);
  } catch (e) {
    next(e);
  }
};
