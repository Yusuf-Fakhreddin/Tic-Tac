import express from "express";
import { getDashboardStatistics } from "../controllers/dashboardController.js";

const router = express.Router();

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(protect, admin, getDashboardStatistics);

export default router;
