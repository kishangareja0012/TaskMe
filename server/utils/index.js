import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("DB connection established");
  } catch (error) {
    console.log("DB Error: " + error);
  }
};

export const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  // console.log

  // Change sameSite from strict to none when you deploy your app
  res.cookie("token", token, {
    httpOnly: false,
    secure: true,
    expires: new Date(Date.now() + 86400000),
  });

  return token;
};
