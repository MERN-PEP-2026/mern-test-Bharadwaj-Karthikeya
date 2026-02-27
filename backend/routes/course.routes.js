import {
  createCourseController,
  getAllCoursesController,
  deleteCourseController,
  updateCourseController,
  getCourseDetailsController,
} from "../controllers/course.controller.js";

import { authenticate, authorize } from "../middleware/auth.middleware.js";

import express from "express";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize(["admin", "instructor"]),
  createCourseController,
);

router.get("/", authenticate, getAllCoursesController);

router.delete(
  "/:id",
  authenticate,
  authorize(["admin", "instructor"]),
  deleteCourseController,
);

router.get("/:id", authenticate, getCourseDetailsController);

router.patch(
  "/:id",
  authenticate,
  authorize(["admin", "instructor"]),
  updateCourseController,
);

export default router;