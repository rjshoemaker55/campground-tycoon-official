import mongoose, { Document, Schema, Types } from "mongoose";
import { TileDocument } from "./Tile";

export interface UserDocument extends Document {
  username: string;
  password: string;
  money: number;
  lastUpdate: Date;
  tiles: Types.Array<TileDocument["_id"]>;
}

export interface LoggedInUser {
  _id: string;
  username: string;
  money: number;
  lastUpdate: Date;
}

const userSchema = new Schema({
  username: String,
  password: String,
  money: {
    type: Number,
    default: 0
  },
  lastUpdate: {
    type: Date,
    default: Date.now
  },
  tiles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tile" // Assuming your Tile model is named "Tile"
    }
  ]
});

export default mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);
