import { model, Schema } from "mongoose";
const tagSchema = new Schema<ITag>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

export const TagModel = model<ITag>("Tag", tagSchema);
