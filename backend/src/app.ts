// src/app.ts

import "dotenv/config";
import express, { Express } from "express";
import connectDB from "./config/db";
import routes from "./routes/index";

const app: Express = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// API Routes → all routes inside /routes/index.ts
app.use("/api", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
