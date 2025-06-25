import { User } from "./user.model";

// get single user
export const singleUser = async (id: string) => {
  const user = await User.find({ _id: id }).select([
    "-password",
    "-__v",
    "-updatedAt",
  ]);

  return user || null;
};

// create new user
export const createNewUser = async (userData: IUser) => {
  const isUser = await User.findOne({ email: userData.email });

  if (!isUser) {
    const user = await new User(userData).save();

    return user || null;
  }

  return null;
};

// update user
export const updateUser = async (id: string, userData: IUser) => {
  const isUpdate = await User.findByIdAndUpdate(id, userData, { new: true });

  return isUpdate || null;
};

// update user role
export const updateStatus = async (id: string, status: boolean) => {
  const isUpdate = await User.findByIdAndUpdate(
    id,
    { isActive: status },
    { new: true }
  );

  return isUpdate || null;
};

// get all user
export const allUsers = async () => {
  return await User.find().select(["-password", "-__v", "-updatedAt"]).lean();
};

// delete user
export const deleteUser = async (id: string) => {
  const isDelete = await User.findByIdAndDelete(id);

  return isDelete ? true : false;
};
