import express from "express";
import {
	getTodayStatistics,
	getMonthStatistics,
	getWeekStatistics,
	getYearStatistics,
} from "../controllers/intervalStatisticsController.js";
const router = express.Router();

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/today").get(protect, admin, getTodayStatistics);
router.route("/week").get(protect, admin, getWeekStatistics);
router.route("/month").get(protect, admin, getMonthStatistics);
router.route("/year").get(protect, admin, getYearStatistics);

export default router;
