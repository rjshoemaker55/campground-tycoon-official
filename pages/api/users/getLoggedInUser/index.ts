import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  dbConnect();

  switch (method) {
    case "GET":
      try {
        const user = await User.findById(req.query.userId).select("-password");
        const userData = await user.toObject();
        console.log("User from /getLoggedInUser route: " + JSON.stringify(userData));
        return res.status(201).json(userData);
      } catch (error) {
        console.error(error);
      }
  }
}
