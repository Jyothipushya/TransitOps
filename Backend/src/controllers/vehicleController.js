import Vehicle from "../models/Vehicle.js";

export const createVehicle = async (req, res) => {
  try {
    const {
      registrationNumber,
      vehicleName,
      vehicleType,
      maximumLoadCapacity,
      odometer,
      acquisitionCost,
      status,
    } = req.body;

    const existingVehicle = await Vehicle.findOne({
      registrationNumber,
    });

    if (existingVehicle) {
      return res.status(400).json({
        success: false,
        message: "Vehicle registration number already exists",
      });
    }

    const vehicle = await Vehicle.create({
      registrationNumber,
      vehicleName,
      vehicleType,
      maximumLoadCapacity,
      odometer,
      acquisitionCost,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      vehicle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: vehicles.length,
      vehicles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      success: true,
      vehicle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    // Prevent duplicate registration number
    if (
      req.body.registrationNumber &&
      req.body.registrationNumber !== vehicle.registrationNumber
    ) {
      const existingVehicle = await Vehicle.findOne({
        registrationNumber: req.body.registrationNumber,
      });

      if (existingVehicle) {
        return res.status(400).json({
          success: false,
          message: "Registration number already exists",
        });
      }
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      vehicle: updatedVehicle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    // Business Rule
    if (vehicle.status === "On Trip") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete a vehicle that is currently on a trip",
      });
    }

    if (vehicle.status === "In Shop") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete a vehicle under maintenance",
      });
    }

    await Vehicle.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};