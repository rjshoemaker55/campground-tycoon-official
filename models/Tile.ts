import mongoose, { Document, Schema } from "mongoose";

export interface TileDocument extends Document {
  userId: string;
  hasCabin: boolean;
  position: number;
}

const tileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  hasCabin: { type: Boolean, default: false },
  position: { type: Number, required: true }
});

export default mongoose.models.Tile || mongoose.model<TileDocument>("Tile", tileSchema);
