import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import driverRoutes from "./routes/DriverRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import maintenanceRoutes from "./routes/maintenanceRoutes.js";
import fuelRoutes from "./routes/fuelRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL ? process.env.CLIENT_URL : true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/fuel", fuelRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "TransitOps Backend Running",
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "TransitOps API",
    endpoints: {
      auth: "/api/auth",
      vehicles: "/api/vehicles",
      drivers: "/api/drivers",
      trips: "/api/trips",
      maintenance: "/api/maintenance",
      fuel: "/api/fuel",
      expenses: "/api/expenses",
      dashboard: "/api/dashboard",
      reports: "/api/reports",
    },
  });
});

export default app;