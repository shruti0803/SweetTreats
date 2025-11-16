import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const isAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid user token" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "User auth failed" });
  }
};
