import express from "express";
import {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Fleet Manager & Financial Analyst can view expenses
router.get(
  "/",
  authMiddleware,
  authorizeRoles("Fleet Manager", "Financial Analyst"),
  getAllExpenses
);

router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("Fleet Manager", "Financial Analyst"),
  getExpenseById
);

// Only Financial Analyst can create expenses
router.post(
  "/",
  authMiddleware,
  authorizeRoles("Financial Analyst"),
  createExpense
);

// Only Financial Analyst can update expenses
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("Financial Analyst"),
  updateExpense
);

// Only Financial Analyst can delete expenses
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("Financial Analyst"),
  deleteExpense
);

export default router;