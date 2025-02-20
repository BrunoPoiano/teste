import { Request, Response } from 'express';
import { generateToken, passwordCompare } from '../auth';
import { User, UserModel } from '../models';
import databaseInit from '../database';
import lib from '../lib';

export const createUser = async (req: Request, resp: Response) => {
  try {
    const { name, email, address, coordinates } = req.body;

    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return resp.status(404).json({ error: 'Email already exists' });
    }

    if (!coordinates && !address) {
      return resp.status(400).json({ error: 'Send a coordinates or address' });
    }
    if (coordinates && address) {
      return resp
        .status(400)
        .json({ error: 'Send only coordinates or address' });
    }
    const newUser = new UserModel({
      name: name,
      email: email,
      coordinates: coordinates,
      address: address,
    });

    if (!coordinates) {
      const { lat, lng } = await lib.getCoordinatesFromAddress(address);
      newUser.coordinates = [lng, lat];
    }
    if (!address) {
      newUser.address = await lib.getAddressFromCoordinates(coordinates);
    }
    await newUser.save();

    return resp.status(201).json({ message: 'User created', user: newUser });
  } catch (err) {
    console.error('❌ Error adding user:', err);
    return resp
      .status(500)
      .json({ error: 'Failed to create user', details: err });
  }
};

export const login = async (req: Request, resp: Response) => {
  try {
    await databaseInit();
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email }).lean();

    if (!user) {
      resp.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    //const isPasswordValid = await passwordCompare(password, user.password);
    //if (!isPasswordValid) {
    //resp.status(401).json({ message: "Invalid credentials" });
    //return;
    //}

    const token = generateToken(user);
    resp.status(200).json({ token: token, user: user });
  } catch (error) {}
};
