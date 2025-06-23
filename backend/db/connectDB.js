import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MONGODB CONNECTEd: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connection to MongoDB:", error.message);
    process.exit(1);
  }
};
