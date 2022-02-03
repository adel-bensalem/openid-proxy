import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
  isDev: process.env.NODE_ENV !== "production",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  clientUrl: process.env.CLIENT_URL || "",
};

export { config };
