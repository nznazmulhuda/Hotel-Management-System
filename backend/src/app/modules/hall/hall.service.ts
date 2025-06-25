import { Request, Response } from "express";
import { HallController } from "./hall.controller";
import sendResponse from "../../utils/sendResponse";
export class HallService {
  static async createHall(req: Request, res: Response) {
    try {
      const hallData: IHall = req.body;
      const hall = await HallController.createHall(hallData);
      sendResponse<IHall>(res, {
        statusCode: 201,
        success: true,
        message: "Hall created successfully",
        data: hall,
      });
    } catch (error: any) {
      sendResponse(res, {
        statusCode: 400,
        success: false,
        message: error.message || "Failed to create hall",
      });
    }
  }

  static async getAllHalls(_: Request, res: Response) {
    try {
      const halls = await HallController.getAllHalls();
      sendResponse<IHall[]>(res, {
        statusCode: 200,
        success: true,
        message: "Halls fetched successfully",
        data: halls,
      });
    } catch (error: any) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: error.message || "Failed to fetch halls",
      });
    }
  }

  static async getHallById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const hall = await HallController.getHallById(id);
      sendResponse<IHall>(res, {
        statusCode: 200,
        success: true,
        message: "Hall fetched successfully",
        data: hall,
      });
    } catch (error: any) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: error.message || "Hall not found",
      });
    }
  }

  static async updateHall(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const hall = await HallController.updateHall(id, req.body);
      sendResponse<IHall>(res, {
        statusCode: 200,
        success: true,
        message: "Hall updated successfully",
        data: hall,
      });
    } catch (error: any) {
      sendResponse(res, {
        statusCode: 400,
        success: false,
        message: error.message || "Failed to update hall",
      });
    }
  }

  static async deleteHall(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await HallController.deleteHall(id);
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Hall deleted successfully",
      });
    } catch (error: any) {
      sendResponse(res, {
        statusCode: 400,
        success: false,
        message: error.message || "Failed to delete hall",
      });
    }
  }
}
