import { Schema, model } from "mongoose";
const linkSchema = new Schema<ILink>({
  hash: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
});
export const LinkModel = model<ILink>("links", linkSchema);
