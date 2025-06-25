import { Guest } from "./guest.model";

// guest controller class
class GuestController {
  // create a new guest
  static async createGuest(data: IGuest) {
    const isRegistered = await Guest.findOne({
      $or: [
        { email: data?.email },
        { number: data?.number },
        { nidNumber: data?.nidNumber },
        { passportNumber: data?.passportNumber },
      ],
    });

    if (isRegistered) {
      console.log(isRegistered);
      throw new Error("Guest already registered!");
    }

    const isAdded = await new Guest(data).save();

    if (!isAdded) throw new Error("Somthing went wrong. Try again!");

    return isAdded;
  }

  // get single guest data
  static async getSingleGuest(data: {
    id?: string;
    email?: string;
    number?: string;
    nidNumber?: string;
    passportNumber?: string;
  }) {
    const conditions = [];

    if (data?.id) {
      conditions.push({ _id: data.id });
    }
    if (data?.email) {
      conditions.push({ email: data.email });
    }
    if (data?.number) {
      conditions.push({ number: data.number });
    }
    if (data?.nidNumber) {
      conditions.push({ nidNumber: data.nidNumber });
    }
    if (data?.passportNumber) {
      conditions.push({ passportNumber: data.passportNumber });
    }

    const guest = await Guest.findOne({
      $or: conditions,
    });

    if (!guest) throw new Error("Guest not found!");

    return guest;
  }

  // get all guest data
  static async allGuests() {
    return await Guest.find().lean();
  }

  // update single guest data
  static async updateGuest(id: string, data: IGuest) {
    const isUpdated = await Guest.findByIdAndUpdate(id, data);

    if (!isUpdated) throw new Error("Guest not update!");

    return isUpdated;
  }

  // delete guest data
  static async deleteGuest(id: string) {
    const isDeleted = await Guest.findByIdAndDelete(id);

    if (!isDeleted) throw new Error("Guest not deleted!");

    return isDeleted;
  }

  // update guest status
  static async updateStatus(id: string, status: boolean) {
    return await Guest.findByIdAndUpdate(id, { isBlackListed: status });
  }
}

export default GuestController;
