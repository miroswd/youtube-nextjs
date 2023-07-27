import { Storage } from "@google-cloud/storage"
import { NextApiRequest, NextApiResponse } from "next";


export default async function getVideos(req: NextApiRequest, res: NextApiResponse) {

  const { GCP_CREDENTIALS, BUCKET_NAME } = process.env;

  if (!GCP_CREDENTIALS || !BUCKET_NAME) {
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

  const [metadata] = await storage.bucket(BUCKET_NAME).file('').getMetadata();

  return res.json(metadata)
};

export const config = {
  api: {
    bodyParser: false, 
    timeout: 30000,
  },
};