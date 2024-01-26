import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";
import Tile from "../../../../models/Tile";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  dbConnect();

  switch (method) {
    case "POST":
      try {
        const { user, tiles } = req.body;

        // Update user information
        await User.findByIdAndUpdate(user._id, user, { new: true });

        // Update tile information
        for (const tile of tiles) {
          await Tile.findByIdAndUpdate(tile._id, tile, { new: true });
        }

        res.status(200).json({ message: "Game state updated successfully!" });
      } catch (error) {
        console.error(error);
      }
  }
}
