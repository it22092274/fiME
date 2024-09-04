import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export default async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Main database connected")
    }catch (e) {
        console.error('MongoDB connection error',e)
        process.exit(1)
    }

}