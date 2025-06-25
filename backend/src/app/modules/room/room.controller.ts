import { Room } from "./room.model";

export class RoomController {
  static async createRoom(data: IRoom): Promise<IRoom> {
    const room = await Room.create(data);
    if (!room) throw new Error("Room creation failed");
    return room;
  }

  static async getAllRooms(): Promise<IRoom[]> {
    const rooms = await Room.find();
    return rooms;
  }

  static async getRoomById(id: string): Promise<IRoom> {
    const room = await Room.findById(id);
    if (!room) throw new Error("Room not found");
    return room;
  }

  static async updateRoom(id: string, data: Partial<IRoom>): Promise<IRoom> {
    const updatedRoom = await Room.findByIdAndUpdate(id, data, { new: true });
    if (!updatedRoom) throw new Error("Room update failed");
    return updatedRoom;
  }

  static async deleteRoom(id: string): Promise<IRoom> {
    const deletedRoom = await Room.findByIdAndDelete(id);
    if (!deletedRoom) throw new Error("Room delete failed");
    return deletedRoom;
  }
}
