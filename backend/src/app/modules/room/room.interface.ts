interface IRoom {
  roomNumber: string;
  floor: number;
  roomType: "single" | "double" | "deluxe" | "suite" | "vip";
  bedType: "single" | "double" | "king" | "queen";
  isAvailable: boolean;
  pricePerNight: number;
  features?: string[];
  description?: string[];
  imageUrl?: string;
  isUnderMaintenance?: boolean;
  maxOccupancy: number;
}
