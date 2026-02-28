import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title:      { type: String, required: true },
    slug:       { type: String, required: true, unique: true },
    excerpt:    { type: String, default: "" },
    content:    { type: String, required: true },
    coverImage: { type: String, default: "" },
    category:   { type: String, default: "General" },
    published:  { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;