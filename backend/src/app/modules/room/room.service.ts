import { Request, Response } from "express";
import { RoomController } from "./room.controller";
import sendResponse from "../../utils/sendResponse";

export class RoomService {
  static async createRoom(req: Request, res: Response) {
    try {
      const roomData: IRoom = req.body;
      const newRoom = await RoomController.createRoom(roomData);

      sendResponse<IRoom>(res, {
        statusCode: 201,
        success: true,
        message: "Room created successfully",
        data: newRoom,
      });
    } catch (error: any) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: error?.message || "Something went wrong",
      });
    }
  }

  static async getAllRooms(_: Request, res: Response) {
    try {
      const rooms = await RoomController.getAllRooms();
      sendResponse<IRoom[]>(res, {
        statusCode: 200,
        success: true,
        message: "Rooms retrieved successfully",
        data: rooms,
      });
    } catch (error: any) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: error?.message,
      });
    }
  }

  static async getRoomById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const room = await RoomController.getRoomById(id);

      sendResponse<IRoom>(res, {
        statusCode: 200,
        success: true,
        message: "Room found",
        data: room,
      });
    } catch (error: any) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: error?.message,
      });
    }
  }

  static async updateRoom(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedRoom = await RoomController.updateRoom(id, req.body);

      sendResponse<IRoom>(res, {
        statusCode: 200,
        success: true,
        message: "Room updated",
        data: updatedRoom,
      });
    } catch (error: any) {
      sendResponse(res, {
        statusCode: 400,
        success: false,
        message: error?.message,
      });
    }
  }

  static async deleteRoom(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await RoomController.deleteRoom(id);

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Room deleted",
      });
    } catch (error: any) {
      sendResponse(res, {
        statusCode: 400,
        success: false,
        message: error?.message,
      });
    }
  }
}
