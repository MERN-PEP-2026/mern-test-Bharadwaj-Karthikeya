import {
    registerController,
    loginController,
    updateProfileController,
    deleteUserController,
    getUserController,
} from "../controllers/auth.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

import express from "express";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/profile", authenticate, getUserController);
router.patch("/profile", authenticate, updateProfileController);
router.delete("/profile", authenticate, deleteUserController);

export default router;