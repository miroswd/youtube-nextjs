import { VideoSchema } from "@/models/VideoSchema";
import connectMongo from "@/services/mongo";
import { Storage } from "@google-cloud/storage"
import { NextApiRequest, NextApiResponse } from "next";


export default async function getThumbs(req: NextApiRequest, res: NextApiResponse) {
  connectMongo();

  const { GCP_CREDENTIALS, BUCKET_THUMB_NAME, NEXT_PUBLIC_THUMB_STORAGE } = process.env;

  if (!GCP_CREDENTIALS || !BUCKET_THUMB_NAME || !NEXT_PUBLIC_THUMB_STORAGE) {
    return res.status(500).json({success: false, message: "Failed to load bucket credentials"})
  }

  const { private_key, ...rest_credentials } =  JSON.parse(GCP_CREDENTIALS);

  const credentials = {
    ...rest_credentials,
    private_key: private_key.replace(/\\n/g, '\n')
  }

  const storage = new Storage({
    credentials
  });

  const [metadata] = await storage.bucket(BUCKET_THUMB_NAME).getFiles();
  
  const thumbs = metadata.map(files => files.name);

  const videos = await Promise.all(thumbs.map(async (thumb) => {
    const video = await VideoSchema.find({id: thumb.replace(/\.(png|jpe?g)/gm, '')}, {_id: 0, description: 0, updatedAt: 0, __v: 0});
    return {...video[0]._doc, imageLink: `${NEXT_PUBLIC_THUMB_STORAGE}/${thumb}`}
  }))

  return res.json(videos);
};