import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connection.on("open", () => {
	console.info("Database connected");
});

mongoose.connection.on("close", () => {
	console.info("something went wrong");
});

export const mongoConnect = async () => {
	await mongoose.connect(process.env.My_URI as string);
};

export const mongoDisconnect = async () => {
	await mongoose.disconnect();
};
