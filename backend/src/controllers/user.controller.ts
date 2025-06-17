import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../config/db";
import {
  createUserSchema,
  updateUserSchema,
  CreateUser,
  UpdateUser,
} from "../validation/user.validation";
import config from "../config/env.config";

/* -------------------------------------------------------------------------- */
/* 🧑‍🤝‍🧑  GET /api/users                                                      */
/* -------------------------------------------------------------------------- */
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return res.json(users);
  } catch {
    return res.status(500).json({ message: "Failed to fetch users" });
  }
};

/* -------------------------------------------------------------------------- */
/* 🧑  GET /api/user                                                      */
/* -------------------------------------------------------------------------- */
export const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.query;
  const userId = Number(id); // convert id to integer

  try {
    const users = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });
    return res.json(users);
  } catch {
    return res.status(500).json({ message: "Failed to fetch users" });
  }
};

/* -------------------------------------------------------------------------- */
/* ❌  DELETE /api/user                                                      */
/* -------------------------------------------------------------------------- */

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.query;
  const userId = Number(id); // convert id to integer

  try {
    const users = await prisma.user.delete({
      where: { id: userId },
    });
    return res.json(users);
  } catch {
    return res.status(500).json({ message: "Failed to fetch users" });
  }
};

/* -------------------------------------------------------------------------- */
/* ➕  POST /api/users  – Create user                                          */
/* -------------------------------------------------------------------------- */
export const createUser = async (
  req: Request<{}, {}, CreateUser>,
  res: Response
) => {
  /* ----------  Validate body ---------- */
  const parsed = createUserSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
  }

  const { name, email, phoneNumber, password, role } = parsed.data;

  try {
    /* ----------  Uniqueness check ---------- */
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    /* ----------  Hash password & save ---------- */
    const hashed = await bcrypt.hash(password, config.salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phoneNumber,
        password: hashed,
        role,
        isActive: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(201).json(user);
  } catch {
    return res.status(500).json({ message: "Failed to create user" });
  }
};

/* -------------------------------------------------------------------------- */
/* ✏️  PUT /api/users  – Update user                                          */
/* -------------------------------------------------------------------------- */
export const updateUser = async (
  req: Request<{}, {}, UpdateUser>,
  res: Response
) => {
  /* ----------  Validate body ---------- */
  const parsed = updateUserSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
  }
  const { id, password, ...rest } = parsed.data;

  try {
    /* ----------  Build update payload ---------- */
    const updatePayload: Partial<UpdateUser> & { password?: string } = rest;
    if (password) {
      updatePayload.password = await bcrypt.hash(password, 10);
    }

    const updated = await prisma.user.update({
      where: { id },
      data: updatePayload,
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.json(updated);
  } catch {
    return res.status(500).json({ message: "Failed to update user" });
  }
};
