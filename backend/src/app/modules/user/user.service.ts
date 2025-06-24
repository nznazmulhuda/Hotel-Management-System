import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  allUsers,
  createNewUser,
  deleteUser,
  singleUser,
  updateStatus,
  updateUser,
} from "./user.controller";
import status from "http-status";

// get all users
export const getAllUserFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const users = await allUsers();

    // when users are exixts
    if (users.length) {
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        data: users,
        message: "Successfully fetched users!",
        meta: {
          total: users.length,
        },
      });
    }

    // when there is no users
    return sendResponse(res, {
      statusCode: status.NOT_FOUND,
      success: true,
      message: "No users found!",
      meta: {
        total: users.length,
      },
    });
  }
);

// get single user
export const getSingleUserFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await singleUser(id);

    if (user) {
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        data: user,
        message: "Successfully fetched user!",
      });
    }

    return sendResponse(res, {
      statusCode: status.NOT_FOUND,
      success: true,
      data: user,
      message: "User not found!",
    });
  }
);

// create new user
export const createUserOnDB = catchAsync(
  async (req: Request, res: Response) => {
    const data: IUser = req.body;

    const isUserCreate = await createNewUser(data);

    if (isUserCreate) {
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User created successfull!",
      });
    }

    return sendResponse(res, {
      statusCode: status.NOT_ACCEPTABLE,
      success: false,
      message: "User not created!",
    });
  }
);

// update user
export const updateUserData = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;

    const isUpdate = await updateUser(id, updatedData);

    if (isUpdate) {
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User data updated!",
      });
    }

    return sendResponse(res, {
      statusCode: status.NOT_MODIFIED,
      success: false,
      message: "User not updated!",
    });
  }
);

// update user status
export const updateUserStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    const isUpdated = await updateStatus(id, status);

    if (isUpdated) {
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Status updated!",
      });
    }

    return sendResponse(res, {
      statusCode: status.NOT_MODIFIED,
      success: false,
      message: "Status not updated!",
    });
  }
);

// delete user
export const deleteUserFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const isDelete = await deleteUser(id);

    if (isDelete) {
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User delete successful!",
      });
    }

    return sendResponse(res, {
      statusCode: status.NOT_MODIFIED,
      success: false,
      message: "User not deleted. Try again!",
    });
  }
);
