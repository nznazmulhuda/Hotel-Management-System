interface ILoginRequest {
  username: string;
  password: string;
}

interface ILoginResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    username: string;
    role: string;
    isActive: boolean;
  };
}

interface IForgetPasswordRequest {
  email: string;
}

interface IResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

interface IChangePasswordRequest {
  username: string;
  oldPassword: string;
  newPassword: string;
}
