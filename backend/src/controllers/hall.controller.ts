import { RequestHandler } from "express";
import prisma from "../config/db";
import { hallCreateSchema, hallUpdateSchema } from "../validation/hall.zod";
import {
  hallBookingCreateSchema,
  hallBookingUpdateSchema,
  hallAvailabilitySchema,
} from "../validation/hallBooking.zod";

/* ─── Helper ─────────────────────────────────────────────── */
const hallFree = async (
  hallId: number,
  start: Date,
  end: Date,
  exclude?: number
) =>
  !(await prisma.hallBooking.findFirst({
    where: {
      hallId,
      id: exclude ? { not: exclude } : undefined,
      status: { in: ["BOOKED", "IN_USE"] },
      AND: [{ startTime: { lt: end } }, { endTime: { gt: start } }],
    },
  }));

/* ─── Hall CRUD ──────────────────────────────────────────── */
export const listHalls: RequestHandler = async (_req, res, next) => {
  try {
    const halls = await prisma.hall.findMany();
    res.json(halls);
  } catch (e) {
    next(e);
  }
};

export const createHall: RequestHandler = async (req, res, next) => {
  const parsed = hallCreateSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });

  const { equipment, ...hallData } = parsed.data;

  try {
    const hall = await prisma.hall.create({
      data: {
        ...hallData,
        equipment: {
          create: (equipment || []).map((name) => ({ name })),
        },
      },
      include: { equipment: true },
    });
    res.status(201).json(hall);
  } catch (e) {
    next(e);
  }
};

/* ---------------- Update Hall ---------------- */
export const updateHall: RequestHandler = async (req, res, next) => {
  const parsed = hallUpdateSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });

  const { id, equipment, ...data } = parsed.data;

  try {
    const hall = await prisma.hall.update({
      where: { id },
      data: {
        ...data,
        ...(equipment && {
          equipment: {
            deleteMany: {}, // remove old equipment
            create: equipment.map((n) => ({ name: n })),
          },
        }),
      },
      include: { equipment: true },
    });
    res.json(hall);
  } catch (e) {
    next(e);
  }
};

export const deleteHall: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  const hallId = Number(req.params.id);

  try {
    await prisma.$transaction([
      prisma.hallBooking.deleteMany({ where: { hallId } }),
      prisma.hallEquipment.deleteMany({ where: { hallId } }),
      prisma.hall.delete({ where: { id: hallId } }),
    ]);

    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

/* ─── Booking CRUD ───────────────────────────────────────── */
export const listHallBookings: RequestHandler = async (_req, res, next) => {
  try {
    const bookings = await prisma.hallBooking.findMany({
      include: { hall: true, guest: true, services: true },
    });
    res.json(bookings);
  } catch (e) {
    next(e);
  }
};

export const createHallBooking: RequestHandler = async (req, res, next) => {
  const parsed = hallBookingCreateSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });

  const { hallId, startTime, endTime, services, ...rest } = parsed.data;

  try {
    if (!(await hallFree(hallId, startTime, endTime)))
      return res.status(409).json({ message: "Hall not available" });

    const booking = await prisma.hallBooking.create({
      data: {
        hallId,
        startTime,
        endTime,
        ...rest,
        services: {
          create: services || [],
        },
      },
      include: { hall: true, guest: true, services: true },
    });
    res.status(201).json(booking);
  } catch (e) {
    next(e);
  }
};

export const updateHallBooking: RequestHandler = async (req, res, next) => {
  const parsed = hallBookingUpdateSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });

  const { id, hallId, startTime, endTime, services, ...rest } = parsed.data;

  try {
    if (hallId && startTime && endTime) {
      if (!(await hallFree(hallId, startTime, endTime, id)))
        return res.status(409).json({ message: "Hall not available" });
    }

    const booking = await prisma.hallBooking.update({
      where: { id },
      data: {
        hallId,
        startTime,
        endTime,
        ...rest,
        ...(services && {
          services: {
            deleteMany: {},
            create: services,
          },
        }),
      },
      include: { hall: true, guest: true, services: true },
    });
    res.json(booking);
  } catch (e) {
    next(e);
  }
};

export const deleteHallBooking: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    await prisma.hallBooking.delete({ where: { id: Number(req.params.id) } });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

/* ─── Availability -------------------------------------------------------- */
export const hallAvailability: RequestHandler = async (req, res, next) => {
  const parsed = hallAvailabilitySchema.safeParse(req.query);
  if (!parsed.success)
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });

  const { hallId, start, end } = parsed.data;

  try {
    const available = await hallFree(hallId, start, end);
    res.json({ available });
  } catch (e) {
    next(e);
  }
};
