// user role
export enum UserRole {
  Admin = "Admin",
  FrontDesk = "FrontDesk",
  Housekeeping = "Housekeeping",
  RestaurantStaff = "RestaurantStaff",
  InventoryManager = "InventoryManager",
}

// when user create
export interface CreateUser {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: UserRole;
}

// get user data
export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
