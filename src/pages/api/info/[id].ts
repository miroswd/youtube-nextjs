import { VideoSchema } from "@/models/VideoSchema";
import connectMongo from "@/services/mongo";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getVideoInfo(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  if (!id) return res.status(403).json({ message: "Id is required" });

  connectMongo();

  const video = await VideoSchema.findOneAndUpdate({ id }, { $inc: {views: 1} });

  return res.status(200).json(video);
}