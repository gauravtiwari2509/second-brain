import { Schema, model } from "mongoose";
const linkSchema = new Schema<ILink>(
  {
    hash: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const LinkModel = model<ILink>("Link", linkSchema);
