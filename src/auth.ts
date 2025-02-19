
import { expressjwt } from "express-jwt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "./models";

const jwtConfig = {
	secret: process.env.JWT_SECRET || "WA3B9jrGrcJV0CWWjNPXSSYnKyNszdrYNKcRJC1QpjW7w8G8pwv7q97WBc9",
	expiresIn: "24h",
};

export const authMiddleware = expressjwt({
	secret: jwtConfig.secret,
	algorithms: ["HS256"],
	requestProperty: "user",
}).unless({
	path: [
		"/api/auth/login",
		"/api/auth/register",
		{ url: /\/public\/.*/, methods: ["GET"] },
	],
});


export const passwordCompare = async (
	password: string,
	hashedPassword: string,
): Promise<boolean> => {
	return bcrypt.compare(password, hashedPassword);
};

export const hashPassword = async (password: string): Promise<string> => {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(password, salt);
};

export const generateToken = (user: User) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn },
    );
};
