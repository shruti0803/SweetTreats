import { Request, Response } from "express";
import Admin from "../models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ------------------ REGISTER ADMIN ------------------
export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password, superAdmin } = req.body;

    // check existing
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin email already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      superAdmin: superAdmin || false
    });

    // generate JWT
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "Admin registered successfully",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        superAdmin: admin.superAdmin
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Error registering admin" });
  }
};

// ------------------ LOGIN ADMIN ------------------
export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid admin credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid admin credentials" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        superAdmin: admin.superAdmin
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in admin" });
  }
};
