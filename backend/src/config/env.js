import dotenv from "dotenv";

dotenv.config({
    path:[".env"]
});

const port = process.env.PORT;
const uri = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;
const jwtExpire = process.env.JWT_EXPIRE;
const origin = process.env.ORIGIN

export {
  port,
  uri,
  jwtExpire,
  jwtSecret,
  origin
};
