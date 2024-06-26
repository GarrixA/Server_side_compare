import { Request, Response } from "express";
import User from "../models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//get all users
const httpGetAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find().select("-password");
		res.status(200).json({ message: "List of users", users });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

//get one User
const httpGetOneeUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findOne({ _id: req.params.id }).select("-password");

		if (!user) {
			return res.status(404).json({ message: "We can't find any user" });
		}

		res.status(200).json({ message: "User found", data: user });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// Update user
const httpUpdateUser = async (req: Request, res: Response) => {
	try {
		const updatedUser = await User.findOne({ _id: req.params.id }).select(
			"-password",
		);

		if (!updatedUser) {
			return res.status(404).json({ message: "No user found to update" });
		}
		if (req.body.email) {
			updatedUser.email = req.body.email;
		}
		if (req.body.username) {
			updatedUser.username = req.body.username;
		}
		await updatedUser.save();
		return res
			.status(200)
			.json({ message: "User Updated Succcessfully", user: updatedUser });
	} catch (error) {
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

// Delete User
const httpDeleteUser = async (req: Request, res: Response) => {
	try {
		const deleteUser = await User.deleteOne({ _id: req.params.id });
		if (deleteUser.deletedCount === 0) {
			return res.status(404).json({ message: "No user found to delete" });
		}
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// Register User
const httpRegister = async (req: Request, res: Response) => {
	try {
		const { username, email, password, role, status } = req.body;
		const existingUserName = await User.findOne({ $or: [{ username }] });
		if (existingUserName) {
			return res.status(409).json({ message: "Username already exists" });
		}
		const existingUserEmail = await User.findOne({ $or: [{ email }] });
		if (existingUserEmail) {
			return res.status(409).json({ message: "email already exists" });
		}

		const userRole = role || "user";
		const userStatus = status || "inactive";
		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new User({
			username,
			email,
			password: hashedPassword,
			role: userRole,
			status: userStatus,
		});
		await user.save();

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// User Login
const httpLogin = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (!user) {
			return res
				.status(401)
				.json({ message: `${username} username is incorrect use correct one` });
		}

		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(401).json({ message: "Password is incorrect" });
		}

		user.status = "active";
		await user.save();

		const userData = {
			username: user.username,
			email: user.email,
			role: user.role,
			id: user._id,
		};

		const token = jwt.sign(
			{ userId: userData },
			"my_secret_keyIs£1000Kand$1000K",
		);

		res
			.status(200)
			.json({ message: "You've logged in", token, data: userData });
	} catch (error) {
		res
			.status(500)
			.json({ error: "Login failed", message: "Internal Server Error" });
	}
};

export default {
	httpLogin,
	httpRegister,
	httpDeleteUser,
	httpGetAllUsers,
	httpGetOneeUser,
	httpUpdateUser,
};
