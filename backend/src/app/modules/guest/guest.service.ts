import { Request, Response } from "express";
import GuestController from "./guest.controller";
import sendResponse from "../../utils/sendResponse";

class GuestService {
  // all guests
  static async getAllGuest(req: Request, res: Response) {
    try {
      const guests = await GuestController.allGuests();

      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Guest fetched success!",
        data: guests,
        meta: {
          total: guests.length,
        },
      });
    } catch (e: any) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: e.message,
      });
    }
  }

  // single guests
  static async getSingleGuest(req: Request, res: Response) {
    const data: {
      id?: string;
      email?: string;
      number?: string;
      nidNumber?: string;
      passportNumber?: string;
    } = req.query;

    try {
      const guest = await GuestController.getSingleGuest(data);

      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Guest found!",
        data: guest,
      });
    } catch (err: any) {
      sendResponse(res, {
        success: false,
        statusCode: 404,
        message: err.message,
      });
    }
  }

  // add new guest
  static async addNewGuest(req: Request, res: Response) {
    try {
      const data: IGuest = req.body;

      await GuestController.createGuest(data);

      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Guest added!",
      });
    } catch (err: any) {
      sendResponse(res, {
        success: false,
        statusCode: 400,
        message: err.message,
      });
    }
  }

  // update guest data
  static async updateGuest(req: Request, res: Response) {
    try {
      const data: IGuest = req.body;
      const { id } = req.params;

      await GuestController.updateGuest(id, data);

      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Guest data updated!",
      });
    } catch (err: any) {
      sendResponse(res, {
        success: false,
        statusCode: 304,
        message: err.message,
      });
    }
  }

  // delete guest data
  static async deleteGuest(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await GuestController.deleteGuest(id);

      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Guest data deleted success!",
      });
    } catch (err: any) {
      sendResponse(res, {
        success: false,
        statusCode: 304,
        message: err.message,
      });
    }
  }

  // update guest status
  static async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      await GuestController.updateStatus(id, status);

      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Guest status updated!",
      });
    } catch (err: any) {
      sendResponse(res, {
        success: false,
        statusCode: 304,
        message: err.message,
      });
    }
  }
}

export default GuestService;
