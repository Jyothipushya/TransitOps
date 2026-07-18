import mongoose from "mongoose";

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    throw new Error("Missing MONGO_URI in environment configuration");
  }

  try {
    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Failed");
    console.error(error.message);
    console.error(
      "Ensure your MongoDB Atlas cluster allows connections from this IP address or that your connection string is correct."
    );
    throw error;
  }
};

export default connectDB;