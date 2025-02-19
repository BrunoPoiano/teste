/// <reference path="../types/express.d.ts" />
import { Request, Response } from "express";
import databaseInit from "../database";
import { User, UserModel } from "../models";

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

export const updateUser = async (req: Request, resp: Response) => {
  try {
    const { name, email, address, coordinates} = req.body
    const user = req?.user
   if (!user) {
     return resp.status(401).json({ error: "User not found" });
   }
    const userData: Partial<User> = { name, email };
        if (address) userData.address = address;
        if (coordinates) userData.coordinates = coordinates;

        const updatedUser = await UserModel.findOneAndUpdate(
          { _id: user._id },
          userData,
          { new: true, upsert: true, runValidators: true }
        );

    return resp.status(201).json({ message: "User updated", user: updatedUser });
  } catch (err) {
    return resp.status(500).json({ error: "Failed to update user", details: err });
  }
};


export const loggedUser = async (req: Request, resp: Response) => {
  try {
     const user = req?.user
    if (!user) {
      return resp.status(401).json({ error: "User not found" });
    }

    return resp.status(200).json(user);
  } catch (err) {
    console.error(err);
    return resp.status(500).json( err );
  }
};
