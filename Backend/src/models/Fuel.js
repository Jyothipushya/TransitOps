import mongoose from "mongoose";

const fuelSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    liters: {
      type: Number,
      required: true,
    },

    cost: {
      type: Number,
      required: true,
    },

    odometer: {
      type: Number,
      required: true,
    },

    fuelStation: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Fuel", fuelSchema);