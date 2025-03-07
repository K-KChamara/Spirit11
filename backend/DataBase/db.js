import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Database Connected");
  } catch (error) {
    console.error("❌ Database Connection Error:", error);
    process.exit(1); // Exit the process if DB connection fails
  }
};

export default dbConnect;
