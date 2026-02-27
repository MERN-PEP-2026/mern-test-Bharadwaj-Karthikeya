import "dotenv/config";

import cors from "cors";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "https://mern-test-bharadwaj-karthikeya.vercel.app",
      process.env.FRONTEND_URL,
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE" ,],
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

app.get("/api", (req, res) => {
  res.json({
    message: "Hello welcome to the student course management backend API!",
  });
});

export default app;
