/// <reference path="../types/express.d.ts" />
import { Request, Response } from 'express';
import { Region, RegionModel } from '../models';

export const getRegion = async (req: Request, resp: Response) => {
  try {
    const user = req?.user;
    if (!user) {
      return resp.status(401).json({ error: 'User not found' });
    }

    const regions = await RegionModel.find({ user: user._id });

    resp.status(200).json(regions);
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: 'Error getting regions', error: error });
  }
};

export const createRegion = async (req: Request, resp: Response) => {
  try {
    const user = req?.user;
    if (!user) {
      return resp.status(401).json({ error: 'User not found' });
    }
    const { name, coordinates } = req.body;

    const newRegion = new RegionModel({
      user: user._id,
      name: name,
      geojson: { type: 'Polygon', coordinates: coordinates },
    });
    await newRegion.save();

    resp.status(200).json({ region: newRegion });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: 'Error creating region', error: error });
  }
};
export const updateRegion = async (req: Request, resp: Response) => {
  try {
    const user = req?.user;
    if (!user) {
      return resp.status(401).json({ error: 'User not found' });
    }
    const regionId = req.params.id;
    const regionData = req.body;

    const region = await RegionModel.findOneAndUpdate(
      { _id: regionId, user: user._id },
      regionData,
      {}
    );

    resp
      .status(200)
      .json({ message: 'Region updated successfully', region: region });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: 'Error updating region', error: error });
  }
};
export const deleteRegion = async (req: Request, resp: Response) => {
  try {
    const user = req?.user;
    if (!user) {
      return resp.status(401).json({ error: 'User not found' });
    }
    const regionId = req.params.id;

    await RegionModel.deleteOne({ _id: regionId, user: user._id });

    resp.status(200).json({ message: 'Region deleted successfully' });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: 'Error deleting region', error: error });
  }
};
