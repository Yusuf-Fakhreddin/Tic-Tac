import express from "express";
import {
	getTodayStatistics,
	getMonthStatistics,
	getWeekStatistics,
	getYearStatistics,
} from "../controllers/intervalStatisticsController.js";
const router = express.Router();

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/today").get(getTodayStatistics);
router.route("/week").get(getWeekStatistics);
router.route("/month").get(getMonthStatistics);
router.route("/year").get(getYearStatistics);

export default router;
