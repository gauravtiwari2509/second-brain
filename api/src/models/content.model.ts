import { model, Schema } from "mongoose";

const contentTypes = ["image", "video", "article", "audio"];

const contentSchema = new Schema<IContent>({
  link: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: contentTypes,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "TagModel",
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "UserModel",
  },
});
export const ContentModel = model<IContent>("content", contentSchema);
