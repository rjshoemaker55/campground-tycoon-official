import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";
import Tile from "../../../../models/Tile";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const userResponse = await User.findById(req.query.userId).select("-password");
        const user = await userResponse.toObject();

        const tiles = await Tile.find({ userId: req.query.userId });

        return res.status(201).json({ user, tiles });
      } catch (error) {
        console.error(error);
      }
  }
}
