import { RequestHandler } from "express";
import prisma from "../config/db";
import {
  roomTypeCreateSchema,
  roomTypeUpdateSchema,
  roomCreateSchema,
  roomUpdateSchema,
  roomStatusSchema,
} from "../validation/room.zod";

/* ---------------- Room-Type CRUD ---------------- */

export const listRoomTypes: RequestHandler = async (_req, res, next) => {
  try {
    const types = await prisma.roomType.findMany();
    res.json(types);
  } catch (err) {
    next(err);
  }
};

export const createRoomType: RequestHandler = async (req, res, next) => {
  const parsed = roomTypeCreateSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });

  try {
    const type = await prisma.roomType.create({ data: parsed.data });
    res.status(201).json(type);
  } catch (err) {
    next(err);
  }
};

export const updateRoomType: RequestHandler = async (req, res, next) => {
  const parsed = roomTypeUpdateSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });

  try {
    const type = await prisma.roomType.update({
      where: { id: Number(req.params.id) },
      data: parsed.data,
    });
    res.json(type);
  } catch (err) {
    next(err);
  }
};

export const deleteRoomType: RequestHandler = async (req, res, next) => {
  try {
    await prisma.roomType.delete({ where: { id: Number(req.params.id) } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

/* ---------------- Room CRUD + Images ---------------- */

export const listRooms: RequestHandler = async (_req, res, next) => {
  try {
    const rooms = await prisma.room.findMany({
      include: { amenities: true, images: true, type: true },
    });
    res.json(rooms);
  } catch (err) {
    next(err);
  }
};

export const getRoom: RequestHandler = async (req, res, next) => {
  try {
    const room = await prisma.room.findUnique({
      where: { id: Number(req.params.id) },
      include: { amenities: true, images: true, type: true },
    });
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (err) {
    next(err);
  }
};

/* ---- Create Room with Multer images ---- */
export const createRoomWithImages: RequestHandler = async (req, res, next) => {
  const parsed = roomCreateSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });

  try {
    const { amenities, ...roomData } = parsed.data;

    /* build image URLs from uploaded files */
    const files = req.files as Express.Multer.File[];
    const urls = files?.map((f) => `/uploads/${f.filename}`) || [];

    const room = await prisma.room.create({
      data: {
        ...roomData,
        amenities: {
          create: amenities?.map((n) => ({ name: n })) || [],
        },
        images: {
          create: urls.map((url) => ({ url })),
        },
      },
      include: { amenities: true, images: true, type: true },
    });

    res.status(201).json(room);
  } catch (err) {
    next(err);
  }
};

export const updateRoom: RequestHandler = async (req, res, next) => {
  /* ---------------- Normalize body so Zod can parse strings from form-data */
  const bodyForValidation = {
    ...req.body,
    //  amenities / images: Postman may send single string or array
    amenities: req.body.amenities,
    images: req.body.images,
  };

  const parsed = roomUpdateSchema.safeParse(bodyForValidation);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
  }

  try {
    const {
      id,
      amenities,
      images: urlArrayFromBody,
      ...scalarData
    } = parsed.data;

    /* Build payload ------------------------------------------- */
    const data: Prisma.RoomUpdateInput = { ...scalarData };

    /* Handle amenities replacement */
    if (amenities) {
      data.amenities = {
        deleteMany: {},
        create: amenities.map((n) => ({ name: n })),
      };
    }

    /* Handle image replacement via NEW files */
    const files = req.files as Express.Multer.File[] | undefined;
    if (files && files.length) {
      const fileUrls = files.map((f) => `/uploads/${f.filename}`);
      data.images = {
        deleteMany: {},
        create: fileUrls.map((url) => ({ url })),
      };
    } else if (urlArrayFromBody) {
      /* Or via array of URLs in body */
      data.images = {
        deleteMany: {},
        create: urlArrayFromBody.map((url) => ({ url })),
      };
    }

    const room = await prisma.room.update({
      where: { id },
      data,
      include: { amenities: true, images: true, type: true },
    });

    res.json(room);
  } catch (err) {
    next(err);
  }
};

export const deleteRoom: RequestHandler = async (req, res, next) => {
  try {
    await prisma.room.delete({ where: { id: Number(req.params.id) } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export const changeRoomStatus: RequestHandler = async (req, res, next) => {
  const parsed = roomStatusSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });

  try {
    const room = await prisma.room.update({
      where: { id: Number(req.params.id) },
      data: { status: parsed.data.status },
    });
    res.json(room);
  } catch (err) {
    next(err);
  }
};
