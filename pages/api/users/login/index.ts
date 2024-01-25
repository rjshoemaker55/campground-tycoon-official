import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const user = await User.findOne({ username: req.body.username, password: req.body.password });
        if (!user) {
          return res.status(400).json({ success: false, message: "Incorrect username or password." });
        }
        res.status(201).json({ success: true, user: user });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
  }
}
