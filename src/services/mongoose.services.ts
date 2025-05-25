import mongoose from "mongoose";

export const initMongoose = () => {
	mongoose
		.connect(process.env.MONGO_URL || "")
		.then(() => console.log("Connected to MongoDB"))
		.catch((err) => console.error("Connection error:", err));
};
