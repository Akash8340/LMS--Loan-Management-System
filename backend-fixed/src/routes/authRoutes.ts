import express from "express";

import { registerUser, loginUser } from "../controllers/authControllers";
import authMiddleware from "../middleware/authMiddleware";
import { AuthRequest } from "../middleware/authMiddleware";
import User from "../models/User";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// FIX: /me now fetches and returns the actual user from DB (password excluded)
router.get("/me", authMiddleware, async (req: AuthRequest, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
