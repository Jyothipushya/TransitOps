import express from "express";

import {
  createTrip,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip,
} from "../controllers/tripController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Fleet Manager only
router.post(
  "/",
  authMiddleware,
  authorizeRoles("Fleet Manager"),
  createTrip
);

// Fleet Manager & Safety Officer can view trips
router.get(
  "/",
  authMiddleware,
  authorizeRoles("Fleet Manager", "Safety Officer"),
  getAllTrips
);

router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("Fleet Manager", "Safety Officer"),
  getTripById
);

// Fleet Manager only
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("Fleet Manager"),
  updateTrip
);

// Fleet Manager only
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("Fleet Manager"),
  deleteTrip
);

export default router;