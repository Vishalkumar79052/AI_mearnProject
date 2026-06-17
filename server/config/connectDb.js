import mongoose from "mongoose";

let isConnected = false;

async function connectDb() {
    try {
        if (isConnected) {
            return;
        }

        await mongoose.connect(process.env.MONGO_URL);

        isConnected = true;
        console.log("Database Connected");
    } catch (error) {
        console.error("Database Error:", error);
    }
}

export default connectDb;