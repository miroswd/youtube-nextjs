import { IVideo, VideoSchema } from "@/models/VideoSchema";
import connectMongo from "@/services/mongo";
import shortId from "@/utils/shortId";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
try {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  connectMongo();


  const { title, description, tags, views }: IVideo = req.body;


  const id = shortId();

  const videos = await VideoSchema.create({
    id, 
    title,
    description,
    tags,
    views
  });


  return res.status(201).json(videos);
  

} catch (error) {
  return res.status(500).json({message: "Something went wrong"})
}


}