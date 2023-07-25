import { Storage } from "@google-cloud/storage";
import { NextApiRequest, NextApiResponse } from "next";



export default async function getVideo(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string

  if (!id) return res.status(404).json({success: false, message: "Vídeo indisponível"})

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

  const bucket = storage.bucket(BUCKET_NAME);

  const file = bucket.file(id + ".mp4");

  if (!file) {
    return res.status(404).json({success: false, message: "File does not exists"})
  }

  const range = req.headers.range;

  if (!range) {
    res.status(400).send("Requires range headers");
    return;
  }


  const [metadata] = await file.getMetadata();

  const videoSize = parseInt(metadata.size);

  const CHUNK_SIZE = 10 ** 6; 

  const start = Number(range.replace(/\D/g, ''));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  const contentLength = end - start + 1;

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);

  const videoStream = file.createReadStream({ start, end });

  videoStream.pipe(res);
}

