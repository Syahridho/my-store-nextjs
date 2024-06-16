import { retrieveData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await retrieveData("products");
    console.log(data);
    res
      .status(200)
      .json({ status: true, statusCode: 200, message: "success", data });
  }
}
