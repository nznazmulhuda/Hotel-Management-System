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
