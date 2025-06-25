interface IRoomService {
  roomNumber: string;
  serviceStatus: "requested" | "in-progress" | "completed";
  startTime: Date;
  endTime: Date;
  assigne: string | any;
  specialInstructions: string;
}
