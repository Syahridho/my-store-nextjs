import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveDataById, updateData } from "@/lib/firebase/service";
import { verify } from "@/utils/verifyToken";
import {
  responseApiFailed,
  responseApiMethoNotAllowed,
  responseApiNotFound,
  responseApiSuccess,
} from "@/utils/responseApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    verify(req, res, false, async (decode: { id: string }) => {
      const user: any = await retrieveDataById("users", decode.id);
      if (user) {
        user.id = decode.id;
        if (user.carts) {
          responseApiSuccess(res, user.carts);
        } else {
          responseApiSuccess(res, []);
        }
      } else {
        responseApiNotFound(res);
      }
    });
  } else if (req.method === "PUT") {
    verify(req, res, false, async (decoded: { id: string }) => {
      const { data } = req.body;
      await updateData("users", decoded.id, data, (result: boolean) => {
        if (result) {
          responseApiSuccess(res);
        } else {
          responseApiFailed(res);
        }
      });
    });
  } else {
    responseApiMethoNotAllowed(res);
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
