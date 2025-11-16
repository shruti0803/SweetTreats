// src/routes/index.ts

import { Router } from "express";
import userRoutes from "./userRoutes";
import adminRoutes from './adminRoutes';
import sweetRoutes from './sweetRoutes';
const router = Router();

// Auth routes → /api/auth/register, /api/auth/login
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/sweets", sweetRoutes);
// Future:
// router.use("/sweets", sweetRoutes);
// router.use("/inventory", inventoryRoutes);

export default router;
