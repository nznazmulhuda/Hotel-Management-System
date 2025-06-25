import axiosPublic from "@/utils/axiosPublic";

// user login
export const login = async (payload: {
  username: string;
  password: string;
}) => {
  const data = await axiosPublic.post("/auth/login", payload);

  return data;
};
