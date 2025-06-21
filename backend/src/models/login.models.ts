import { UserRole } from "./user.models";

/**
 * Incoming login payload
 */
export interface LoginDto {
  email: string;
  password: string;
}

/**
 * Successful login response
 */
export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    isActive: boolean;
  };
}
