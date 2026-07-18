import express from "express";

import {
  createFuel,
  getAllFuel,
  getFuelById,
  updateFuel,
  deleteFuel,
} from "../controllers/fuelController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Fleet Manager & Financial Analyst can view fuel logs
router.get(
  "/",
  authMiddleware,
  authorizeRoles("Fleet Manager", "Financial Analyst"),
  getAllFuel
);

router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("Fleet Manager", "Financial Analyst"),
  getFuelById
);

// Fleet Manager can create fuel logs
router.post(
  "/",
  authMiddleware,
  authorizeRoles("Fleet Manager"),
  createFuel
);

// Fleet Manager can update fuel logs
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("Fleet Manager"),
  updateFuel
);

// Fleet Manager can delete fuel logs
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("Fleet Manager"),
  deleteFuel
);

export default router;