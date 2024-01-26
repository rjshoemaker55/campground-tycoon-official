import mongoose, { Document, Schema } from "mongoose";
import { TileDocument } from "../types";

const tileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  contents: {
    type: String,
    default: null,
    required: false,
    level: 1
  },
  position: { type: Number, required: true }
});

export default mongoose.models.Tile || mongoose.model<TileDocument>("Tile", tileSchema);
