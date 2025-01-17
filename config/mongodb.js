import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Listen for connection events
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connection established successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB connection disconnected");
    });

    // Attempt to connect to the database
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
