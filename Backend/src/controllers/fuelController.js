import Fuel from "../models/Fuel.js";

// CREATE
export const createFuel = async (req, res) => {
  try {
    const fuel = await Fuel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Fuel record created successfully",
      fuel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
export const getAllFuel = async (req, res) => {
  try {
    const fuels = await Fuel.find()
      .populate("vehicle")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: fuels.length,
      fuels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET BY ID
export const getFuelById = async (req, res) => {
  try {
    const fuel = await Fuel.findById(req.params.id).populate("vehicle");

    if (!fuel) {
      return res.status(404).json({
        success: false,
        message: "Fuel record not found",
      });
    }

    res.status(200).json({
      success: true,
      fuel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
export const updateFuel = async (req, res) => {
  try {
    const fuel = await Fuel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!fuel) {
      return res.status(404).json({
        success: false,
        message: "Fuel record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fuel record updated successfully",
      fuel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
export const deleteFuel = async (req, res) => {
  try {
    const fuel = await Fuel.findById(req.params.id);

    if (!fuel) {
      return res.status(404).json({
        success: false,
        message: "Fuel record not found",
      });
    }

    await Fuel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Fuel record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};