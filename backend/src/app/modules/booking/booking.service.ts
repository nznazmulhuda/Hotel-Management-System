import { Request, Response } from "express";
import { BookingController } from "./booking.controller";
import sendResponse from "../../utils/sendResponse";

export class BookingService {
  static async createBooking(req: Request, res: Response) {
    try {
      const bookingData: IBooking = req.body;

      // Check availability
      const isAvailable = await BookingController.isItemAvailable(
        bookingData.itemType,
        bookingData.itemId,
        bookingData.checkInDate,
        bookingData.checkOutDate
      );
      if (!isAvailable) {
        return sendResponse(res, {
          statusCode: 400,
          success: false,
          message: `${bookingData.itemType} is not available for the selected dates`,
        });
      }

      const newBooking = await BookingController.createBooking(bookingData);
      sendResponse<IBooking>(res, {
        statusCode: 201,
        success: true,
        message: "Booking created successfully",
        data: newBooking,
      });
    } catch (error: any) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: error?.message || "Booking creation failed",
      });
    }
  }

  static async getAllBookings(_: Request, res: Response) {
    try {
      const bookings = await BookingController.getAllBookings();
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Bookings fetched successfully",
        data: bookings,
      });
    } catch (error: any) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: error?.message || "Failed to fetch bookings",
      });
    }
  }

  static async getBookingById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const booking = await BookingController.getBookingById(id);
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking found",
        data: booking,
      });
    } catch (error: any) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: error?.message || "Booking not found",
      });
    }
  }

  static async updateBooking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedBooking = await BookingController.updateBooking(
        id,
        req.body
      );
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking updated",
        data: updatedBooking,
      });
    } catch (error: any) {
      sendResponse(res, {
        statusCode: 400,
        success: false,
        message: error?.message || "Booking update failed",
      });
    }
  }

  static async deleteBooking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await BookingController.deleteBooking(id);
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking deleted",
      });
    } catch (error: any) {
      sendResponse(res, {
        statusCode: 400,
        success: false,
        message: error?.message || "Booking delete failed",
      });
    }
  }
}
