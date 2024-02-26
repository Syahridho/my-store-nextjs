import type { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "@/services/auth/services";
import jwt from "jsonwebtoken";
import { retrieveDataById } from "@/lib/firebase/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      jwt.verify(
        token,
        process.env.NEXT_AUTH_SECRET || "",
        async (error: any, decode: any) => {
          if (decode) {
            const profile = await retrieveDataById("users", decode.id);
            return res.status(200).json({
              status: true,
              statusCode: 200,
              message: "success",
              data: profile,
            });
          }
        }
      );
    }
  }
}
