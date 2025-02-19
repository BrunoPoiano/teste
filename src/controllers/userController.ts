import { Request, Response } from "express";
import databaseInit from "../database";
import { UserModel } from "../models";

export const teste = async (req: Request, resp: Response) => {
  try {
    await databaseInit();

    const newUser = await UserModel.create({
      name: "John Doe",
      email: "johndoe@example.com",
      address: "1600 Amphitheatre Parkway, Mountain View, CA",
      coordinates: [-122.084, 37.422], // Example coordinates
    });

    console.log("✅ New user added!", newUser);
    return resp.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    console.error("❌ Error adding user:", err);
    return resp.status(500).json({ error: "Failed to create user", details: err });
  }
};
