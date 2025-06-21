const port: Number | string = process.env.PORT || 5000;
const JWT_SECRET: string =
  process.env.JWT_SECRET || "OAT67GzxVx6sJxsWNxoDWW1PkOWPC3X097PSYkiVvDU";
const salt: number = Number(process.env.SALT);

export default { port, JWT_SECRET, salt };
