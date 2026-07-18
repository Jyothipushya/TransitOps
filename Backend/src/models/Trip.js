import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },

    source: {
      type: String,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    cargoWeight: {
      type: Number,
      required: true,
    },

    distance: {
      type: Number,
      required: true,
    },

    fuelUsed: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "Scheduled",
        "In Progress",
        "Completed",
        "Cancelled",
      ],
      default: "Scheduled",
    },

    startTime: Date,

    endTime: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Trip", tripSchema);