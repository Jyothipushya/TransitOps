import Vehicle from "../models/vehicle.js";
import Driver from "../models/Driver.js";
import Trip from "../models/Trip.js";
import Maintenance from "../models/Maintenance.js";
import Fuel from "../models/Fuel.js";

export const getReports = async (req, res) => {
  try {
    const totalVehicles = await Vehicle.countDocuments();

    const availableVehicles = await Vehicle.countDocuments({
      status: "Available",
    });

    const onTripVehicles = await Vehicle.countDocuments({
      status: "On Trip",
    });

    const maintenanceVehicles = await Vehicle.countDocuments({
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

    const completedTrips = await Trip.countDocuments({
      status: "Completed",
    });

    const activeTrips = await Trip.countDocuments({
      status: "In Progress",
    });

    const totalMaintenance = await Maintenance.countDocuments();

    const totalFuelCost = await Fuel.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$cost",
          },
        },
      },
    ]);

    const totalFuelLiters = await Fuel.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$liters",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,

      report: {
        vehicles: {
          totalVehicles,
          availableVehicles,
          onTripVehicles,
          maintenanceVehicles,
        },

        drivers: {
          totalDrivers,
          availableDrivers,
          onTripDrivers,
        },

        trips: {
          totalTrips,
          completedTrips,
          activeTrips,
        },

        maintenance: {
          totalMaintenance,
        },

        fuel: {
          totalFuelCost: totalFuelCost[0]?.total || 0,
          totalFuelLiters: totalFuelLiters[0]?.total || 0,
        },
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};