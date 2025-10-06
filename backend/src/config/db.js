import mongoose from "mongoose";
import { uri } from "./env.js";

// Event listeners
mongoose.connection.on("connected", () => {
    console.log("Database connected:", mongoose.connection.host);
});

mongoose.connection.on("disconnected", () => {
    console.log("Database disconnected!");
});

mongoose.connection.on("error", (err) => {
    console.error("Database connection error:", err);
});

/**
 * ConnectDB
 * - Stablish connection between backend and server
 */

const connectDB = async () => {
    await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000
    }).catch(err => {
        console.error("Initial database connection failed:", err);
    });
};

export default connectDB;
