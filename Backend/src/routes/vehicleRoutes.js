import express from "express";
import {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicleController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Fleet Manager only
router.post(
  "/",
  authMiddleware,
  authorizeRoles("Fleet Manager"),
  createVehicle
);

// Any logged-in user
router.get(
  "/",
  authMiddleware,
  getAllVehicles
);

// Any logged-in user
router.get(
  "/:id",
  authMiddleware,
  getVehicleById
);

// Fleet Manager only
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("Fleet Manager"),
  updateVehicle
);

// Fleet Manager only
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("Fleet Manager"),
  deleteVehicle
);

export default router;