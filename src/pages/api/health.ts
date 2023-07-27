import { NextApiRequest, NextApiResponse } from "next";

export default async function health(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({success: true, hi: "miro"})
}
