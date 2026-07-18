import Maintenance from "../models/Maintenance.js";
import Vehicle from "../models/Vehicle.js";

// CREATE
export const createMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.create(req.body);

    await Vehicle.findByIdAndUpdate(req.body.vehicle, {
      status: "In Shop",
    });

    res.status(201).json({
      success: true,
      message: "Maintenance created successfully",
      maintenance,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// GET ALL
export const getAllMaintenance = async (req, res) => {

  try {

    const maintenance = await Maintenance.find()
      .populate("vehicle")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: maintenance.length,
      maintenance,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// GET BY ID
export const getMaintenanceById = async (req, res) => {

  try {

    const maintenance = await Maintenance.findById(req.params.id)
      .populate("vehicle");

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    res.json({
      success: true,
      maintenance,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// UPDATE
export const updateMaintenance = async (req, res) => {

  try {

    const maintenance = await Maintenance.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    if (maintenance.status === "Completed") {
      await Vehicle.findByIdAndUpdate(maintenance.vehicle, {
        status: "Available",
      });
    }

    res.json({
      success: true,
      message: "Maintenance updated successfully",
      maintenance,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// DELETE
export const deleteMaintenance = async (req, res) => {

  try {

    const maintenance = await Maintenance.findById(req.params.id);

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    await Maintenance.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Maintenance deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};