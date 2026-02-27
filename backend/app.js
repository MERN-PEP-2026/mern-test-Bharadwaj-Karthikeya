import "dotenv/config";

import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

export default app;