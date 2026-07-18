import Trip from "../models/Trip.js";
import Driver from "../models/Driver.js";
import Vehicle from "../models/vehicle.js";

// CREATE TRIP
export const createTrip = async (req, res) => {
  try {
    const {
      vehicle,
      driver,
      source,
      destination,
      cargoWeight,
      distance,
      fuelUsed,
      status,
      startTime,
      endTime,
    } = req.body;

    const selectedVehicle = await Vehicle.findById(vehicle);
    const selectedDriver = await Driver.findById(driver);

    if (!selectedVehicle || !selectedDriver) {
      return res.status(404).json({
        success: false,
        message: "Vehicle or Driver not found",
      });
    }

    if (selectedVehicle.status !== "Available") {
      return res.status(400).json({
        success: false,
        message: "Vehicle is not available",
      });
    }

    if (selectedDriver.status !== "Available") {
      return res.status(400).json({
        success: false,
        message: "Driver is not available",
      });
    }

    const trip = await Trip.create({
      vehicle,
      driver,
      source,
      destination,
      cargoWeight,
      distance,
      fuelUsed,
      status,
      startTime,
      endTime,
    });

    selectedVehicle.status = "On Trip";
    selectedDriver.status = "On Trip";

    await selectedVehicle.save();
    await selectedDriver.save();

    res.status(201).json({
      success: true,
      message: "Trip created successfully",
      trip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL TRIPS
export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate("vehicle")
      .populate("driver")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: trips.length,
      trips,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET TRIP BY ID
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate("vehicle")
      .populate("driver");

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    res.status(200).json({
      success: true,
      trip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE TRIP
export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    // If trip completed, make driver & vehicle available again
    if (updatedTrip.status === "Completed") {
      await Vehicle.findByIdAndUpdate(updatedTrip.vehicle, {
        status: "Available",
      });

      await Driver.findByIdAndUpdate(updatedTrip.driver, {
        status: "Available",
      });
    }

    res.status(200).json({
      success: true,
      message: "Trip updated successfully",
      trip: updatedTrip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE TRIP
export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    await Trip.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Trip deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};