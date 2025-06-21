import { RequestHandler } from "express";
import prisma from "../config/db";
import {
  guestCreateSchema,
  guestUpdateSchema,
  guestSearchSchema,
} from "../validation/guest.zod";

/* ------------------- List & Search ------------------- */
export const listGuests: RequestHandler = async (req, res, next) => {
  const { q } = guestSearchSchema.parse(req.query);

  try {
    const guests = await prisma.guest.findMany({
      where: q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { phone: { contains: q } },
              { idNumber: { contains: q } },
            ],
          }
        : undefined,
      orderBy: { createdAt: "desc" },
    });
    res.json(guests);
  } catch (e) {
    next(e);
  }
};

/* ------------------- Single Guest ------------------- */
export const getGuest: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const guest = await prisma.guest.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!guest) return res.status(404).json({ message: "Guest not found" });
    res.json(guest);
  } catch (e) {
    next(e);
  }
};

/* ------------------- Create ------------------- */
export const createGuest: RequestHandler = async (req, res, next) => {
  const parsed = guestCreateSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });

  try {
    const guest = await prisma.guest.create({ data: parsed.data });
    res.status(201).json(guest);
  } catch (e) {
    next(e);
  }
};

/* ------------------- Update ------------------- */
export const updateGuest: RequestHandler = async (req, res, next) => {
  const parsed = guestUpdateSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });

  try {
    const guest = await prisma.guest.update({
      where: { id: parsed.data.id },
      data: parsed.data,
    });
    res.json(guest);
  } catch (e) {
    next(e);
  }
};

/* ------------------- Delete ------------------- */
export const deleteGuest: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    await prisma.guest.delete({ where: { id: Number(req.params.id) } });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};
