const port = process.env.PORT || 5000;
const salt: number = Number(process.env.SALT);

export default { port, salt };
