import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";
import Tile from "../../../../models/Tile";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const user = await User.create(req.body); /* create a new model in the database */

        const userTiles = Array.from({ length: 60 }).map((_, index) => ({
          userId: user._id,
          hasCabin: false,
          position: index
        }));

        const createdTiles = await Tile.insertMany(userTiles);
        await User.findByIdAndUpdate(user._id, { $push: { tiles: { $each: createdTiles.map((tile) => tile._id) } } });

        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
