import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import Tile from "../../../../models/Tile";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  dbConnect();

  switch (method) {
    case "GET":
      try {
        const userId = query.userId as string;
        const tiles = await Tile.find({ userId });

        res.status(201).json({ success: true, tiles: tiles });
      } catch (error) {
        console.error(error);
      }
  }
}
