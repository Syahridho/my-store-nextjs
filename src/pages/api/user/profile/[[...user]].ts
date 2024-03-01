import type { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "@/services/auth/services";
import jwt from "jsonwebtoken";
import { retrieveDataById, updateData } from "@/lib/firebase/service";
import { compare, hash } from "bcrypt";

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
            const profile: any = await retrieveDataById("users", decode.id);
            if (profile) {
              profile.id = decode.id;
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "success",
                data: profile,
              });
            } else {
              res.status(404).json({
                status: false,
                statusCode: 404,
                message: "Not Found",
                data: {},
              });
            }
          } else {
            res.status(403).json({
              status: false,
              statusCode: 404,
              message: "Access Denied",
              data: {},
            });
          }
        }
      );
    }
  } else if (req.method === "PUT") {
    const { user }: any = req.query;
    const { data } = req.body;
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXT_AUTH_SECRET || "",
      async (error: any, decoded: any) => {
        if (decoded) {
          if (data.password) {
            const passwordConfirm = await compare(
              data.oldPassword,
              data.encryptedPassword
            );
            if (!passwordConfirm) {
              res.status(404).json({
                status: false,
                statusCode: 404,
                message: "failed",
              });
            }
            delete data.oldPassword;
            delete data.encryptedPassword;
            data.password = await hash(data.password, 10);
          }

          await updateData("users", user[0], data, (result: boolean) => {
            if (result) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "success",
              });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "failed",
              });
            }
          });
        } else {
          res.status(403).json({
            status: false,
            statusCode: 403,
            message: "Access denied",
          });
        }
      }
    );
  }
}
