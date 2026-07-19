import express from "express";
import {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
} from "../controllers/DriverController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Fleet Manager only
router.post(
  "/",
  authMiddleware,
  authorizeRoles("Fleet Manager"),
  createDriver
);

// Any logged-in user
router.get(
  "/",
  authMiddleware,
  getAllDrivers
);

// Any logged-in user
router.get(
  "/:id",
  authMiddleware,
  getDriverById
);

// Fleet Manager only
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("Fleet Manager"),
  updateDriver
);

// Fleet Manager only
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("Fleet Manager"),
  deleteDriver
);

export default router;