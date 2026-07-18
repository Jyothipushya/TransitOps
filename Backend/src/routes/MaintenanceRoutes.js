import express from "express";

import {
  createMaintenance,
  getAllMaintenance,
  getMaintenanceById,
  updateMaintenance,
  deleteMaintenance,
} from "../controllers/maintenanceController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Fleet Manager only
router.post(
  "/",
  authMiddleware,
  authorizeRoles("Fleet Manager"),
  createMaintenance
);

// Fleet Manager & Safety Officer can view maintenance records
router.get(
  "/",
  authMiddleware,
  authorizeRoles("Fleet Manager", "Safety Officer"),
  getAllMaintenance
);

router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("Fleet Manager", "Safety Officer"),
  getMaintenanceById
);

// Fleet Manager only
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("Fleet Manager"),
  updateMaintenance
);

// Fleet Manager only
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("Fleet Manager"),
  deleteMaintenance
);

export default router;