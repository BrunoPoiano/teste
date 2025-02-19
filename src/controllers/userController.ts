/// <reference path="../types/express.d.ts" />
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

    console.log("user added", newUser);
    return resp.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    console.error("error adding user:", err);
    return resp.status(500).json({ error: "Failed to create user", details: err });
  }
};

export const createUser = async (req: Request, resp: Response) => {
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

export const loggedUser = async (req: Request, resp: Response) => {
  try {
     const user = req?.user
      if(user){

    return resp.status(200).json(user);
      }
  } catch (err) {
    console.error(err);
    return resp.status(500).json( err );
  }
};
