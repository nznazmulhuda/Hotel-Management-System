import { Hall } from "./hall.model";

export class HallController {
  static async createHall(data: IHall): Promise<IHall> {
    const hall = await Hall.create(data);
    if (!hall) throw new Error("Failed to create hall");
    return hall;
  }

  static async getAllHalls() {
    return await Hall.find();
  }

  static async getHallById(id: string) {
    const hall = await Hall.findById(id);
    if (!hall) throw new Error("Hall not found");
    return hall;
  }

  static async updateHall(id: string, data: Partial<IHall>) {
    const updatedHall = await Hall.findByIdAndUpdate(id, data, { new: true });
    if (!updatedHall) throw new Error("Failed to update hall");
    return updatedHall;
  }

  static async deleteHall(id: string) {
    const deletedHall = await Hall.findByIdAndDelete(id);
    if (!deletedHall) throw new Error("Failed to delete hall");
    return deletedHall;
  }
}
