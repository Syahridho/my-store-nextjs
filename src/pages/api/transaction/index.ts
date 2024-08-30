// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { updateData } from "@/lib/firebase/service";
import createTransaction from "@/lib/midtrans/transaction";
import { responseApiFailed, responseApiSuccess } from "@/utils/responseApi";
import { verify } from "@/utils/verifyToken";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    verify(req, res, false, async (decoded: { id: string }) => {
      const payload = req.body;
      console.log(payload);
      delete payload.user.address.isMain;
      console.log(payload.transaction.total);
      const generateOrderId = `${Date.now()}-${Math.random().toString(16)}`;
      const params = {
        transaction_details: {
          order_id: generateOrderId,
          gross_amount: payload.transaction.total,
        },
        customer_details: {
          first_name: payload.user.fullname,
          email: payload.user.email,
          phone: payload.user.address.phone,
        },
      };
      createTransaction(
        params,
        async (transaction: { token: string; redirect_url: string }) => {
          const data = {
            transaction: {
              ...payload.transaction,
              address: payload.user.address,
              token: transaction.token,
              redirect_url: transaction.redirect_url,
              status: "pending",
            },
            carts: [],
          };
          await updateData("users", decoded.id, data, (result: boolean) => {
            if (result) {
              responseApiSuccess(res, {
                token: transaction.token,
                redirect_url: transaction.redirect_url,
              });
            } else {
              responseApiFailed(res);
            }
          });
        }
      );
    });
  }
}
