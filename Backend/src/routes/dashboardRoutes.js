import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Fleet Manager, Safety Officer & Financial Analyst can access dashboard
router.get(
  "/",
  authMiddleware,
  authorizeRoles(
    "Fleet Manager",
    "Safety Officer",
    "Financial Analyst"
  ),
  getDashboard
);

export default router;