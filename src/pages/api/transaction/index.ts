// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import createTransaction from "@/lib/midtrans/transaction";
import { responseApiSuccess } from "@/utils/responseApi";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const generateOrderId = `${Date.now()}-${Math.random().toString(16)}`;
    const params = {
      transaction_details: {
        order_id: generateOrderId,
        gross_amount: 20000,
      },
      customer_details: {
        first_name: "udin",
        email: "syahridhosyahputra@gmail.com",
        phone: "082392251258",
      },
    };
    createTransaction(
      params,
      (transaction: { token: string; redirect_urL: string }) => {
        console.log(transaction);
        responseApiSuccess(res, transaction);
      }
    );
  }
}
