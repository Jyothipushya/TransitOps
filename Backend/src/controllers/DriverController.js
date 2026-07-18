import Driver from "../models/Driver.js";

// CREATE
export const createDriver = async (req, res) => {
  try {
    const existingDriver = await Driver.findOne({
      licenseNumber: req.body.licenseNumber,
    });

    if (existingDriver) {
      return res.status(400).json({
        success: false,
        message: "License number already exists",
      });
    }

    const driver = await Driver.create(req.body);

    res.status(201).json({
      success: true,
      message: "Driver created successfully",
      driver,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: drivers.length,
      drivers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET BY ID
export const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    res.status(200).json({
      success: true,
      driver,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
export const updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    if (
      req.body.licenseNumber &&
      req.body.licenseNumber !== driver.licenseNumber
    ) {
      const existingDriver = await Driver.findOne({
        licenseNumber: req.body.licenseNumber,
      });

      if (existingDriver) {
        return res.status(400).json({
          success: false,
          message: "License number already exists",
        });
      }
    }

    const updatedDriver = await Driver.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Driver updated successfully",
      driver: updatedDriver,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
export const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    if (driver.status === "On Trip") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete driver while on trip",
      });
    }

    await Driver.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Driver deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};