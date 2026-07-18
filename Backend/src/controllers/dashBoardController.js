import Vehicle from "../models/Vehicle.js";
import Driver from "../models/Driver.js";
import Trip from "../models/Trip.js";
import Maintenance from "../models/Maintenance.js";
import Expense from "../models/Expense.js";

export const getDashboard = async (req, res) => {
  try {
    const totalVehicles = await Vehicle.countDocuments();

    const availableVehicles = await Vehicle.countDocuments({
      status: "Available",
    });

    const onTripVehicles = await Vehicle.countDocuments({
      status: "On Trip",
    });

    const inShopVehicles = await Vehicle.countDocuments({
      status: "In Shop",
    });

    const totalDrivers = await Driver.countDocuments();

    const availableDrivers = await Driver.countDocuments({
      status: "Available",
    });

    const onTripDrivers = await Driver.countDocuments({
      status: "On Trip",
    });

    const totalTrips = await Trip.countDocuments();

    const activeTrips = await Trip.countDocuments({
      status: "In Progress",
    });

    const completedTrips = await Trip.countDocuments({
      status: "Completed",
    });

    const totalMaintenance = await Maintenance.countDocuments();

    const pendingMaintenance = await Maintenance.countDocuments({
      status: "Scheduled",
    });

    const totalExpenses = await Expense.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const recentTrips = await Trip.find()
      .populate("driver")
      .populate("vehicle")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,

      dashboard: {
        totalVehicles,
        availableVehicles,
        onTripVehicles,
        inShopVehicles,

        totalDrivers,
        availableDrivers,
        onTripDrivers,

        totalTrips,
        activeTrips,
        completedTrips,

        totalMaintenance,
        pendingMaintenance,

        totalExpenses:
          totalExpenses.length > 0
            ? totalExpenses[0].total
            : 0,

        recentTrips,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};