import { Request, Response } from "express";
import { generateToken, passwordCompare } from "../auth";
import { User, UserModel } from "../models";
import databaseInit from "../database";

export const login = async (req: Request, resp: Response) => {
	try {
	await databaseInit();
		const { email, password } = req.body;

		const user = await UserModel.findOne({ email:email }).lean();

		if (!user) {
			resp.status(401).json({ message: "Invalid credentials" });
			return;
		}
		//const isPasswordValid = await passwordCompare(password, user.password);
		//if (!isPasswordValid) {
		//resp.status(401).json({ message: "Invalid credentials" });
		//return;
		//}

		const token = generateToken(user);
    resp.json({ token: token,user:user });
	} catch (error) {}
};
