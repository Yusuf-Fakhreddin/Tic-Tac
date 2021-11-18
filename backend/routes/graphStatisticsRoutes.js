import express from "express";
import { getYearGraphStatistics } from "../controllers/graphStatisticsController.js";

const router = express.Router();

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(protect, admin, getYearGraphStatistics);

export default router;
