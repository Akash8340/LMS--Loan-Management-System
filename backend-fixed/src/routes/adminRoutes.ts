import express from "express";
import { getDashboardStats } from "../controllers/adminControllers";
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/roleMiddleware";

const router = express.Router();

router.get(
    "/stats",
    authMiddleware,
    roleMiddleware("ADMIN"),
    getDashboardStats
);

export default router;