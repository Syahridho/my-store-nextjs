import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { responseApiAccessDenied } from "./responseApi";

export const verify = (
  req: NextApiRequest,
  res: NextApiResponse,
  isAdmin: boolean,
  callback: Function
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(
      token,
      process.env.NEXT_AUTH_SECRET || "",
      async (error: any, decoded: any) => {
        if (decoded && (isAdmin ? decoded.role === "admin" : true)) {
          callback(decoded);
        } else {
          responseApiAccessDenied(res);
        }
      }
    );
  } else {
    responseApiAccessDenied(res);
  }
};
