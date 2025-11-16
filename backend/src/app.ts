// src/app.ts

import "dotenv/config";
import express, { Express } from "express";
import connectDB from "./config/db";
import routes from "./routes/index";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Express = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// ⭐ FIX: ALLOW FRONTEND ORIGIN
app.use(cors({
  origin: "https://cheerful-arithmetic-9ef9e3.netlify.app", // frontend URL
  credentials: true, // if using cookies or auth
}));
// API Routes → all routes inside /routes/index.ts
app.use("/api", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
