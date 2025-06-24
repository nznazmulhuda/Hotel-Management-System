interface IUser {
  name: string;
  email: string;
  number: string;
  username: string;
  password: string;
  role:
    | "admin"
    | "front-desk"
    | "housekeeping"
    | "restaurant-staff"
    | "inventory-manager";
  comparePassword: (givenPassword: string) => Promise<boolean>;
  isActive: boolean;
}
