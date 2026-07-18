import bcrypt from "bcryptjs";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const { password: _, ...userData } = user.toObject();

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id, user.role),
      user: userData,
    });
  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login Request:", req.body);

    const user = await User.findOne({ email });

    console.log("User Found:", user);

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    console.log("Password Match:", match);

    if (!match) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const { password: _, ...userData } = user.toObject();

    res.status(200).json({
      message: "Login Successful",
      token: generateToken(user._id, user.role),
      user: userData,
    });
  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
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