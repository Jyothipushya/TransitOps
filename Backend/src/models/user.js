import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["Fleet Manager", "Driver", "Safety Officer", "Financial Analyst"],
      default: "Fleet Manager",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);