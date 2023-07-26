import { model, Document, Schema, models } from "mongoose";

export interface IVideo {
  videoId: string;
  title: string;
  description: string;
  tags: string[];
  views: number;
  postDate: string;
}

export interface IVideoSchema extends Omit<IVideo, "postDate">, Document {}

const schema = new Schema<IVideoSchema> ({
  id: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  tags: {
    type: [String]
  },
  views: {
    type: "number"
  }
}, {
  timestamps: {}
});

export const VideoSchema = models.videos || model<IVideo>("videos", schema);
