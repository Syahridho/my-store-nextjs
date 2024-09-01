import Button from "@/components/ui/Button";
import { convertIDR } from "@/utils/currency";
import Script from "next/script";
import { useEffect, useState } from "react";
import ModalDetailOrder from "./ModalDetailOrder";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import AdminLayout from "@/components/layouts/AdminLayout";
import transactionServices from "@/services/transaction";

const AdminOrderView = () => {
  const [detailOrder, setDetailOrder] = useState<any>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState([]);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  const getAllTransaction = async () => {
    const { data } = await transactionServices.getAllTransaction();
    const results = data.data;
    setTransactions(results[1]);
  };

  useEffect(() => {
    getAllTransaction();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />

      <AdminLayout>
        <div className="p-12">
          <h1 className="text-xl font-semibold">Order Management</h1>
          <table className="border-collapse border border-slate-500 w-full mt-4">
            <thead className="bg-gray-300">
              <tr>
                <th className="border border-slate-200 py-1 px-2 text-sm">#</th>
                <th className="border border-slate-200 py-1 px-2 text-sm">
                  Order Id
                </th>
                <th className="border border-slate-200 py-1 px-2 text-sm">
                  User
                </th>
                <th className="border border-slate-200 py-1 px-2 text-sm">
                  Total
                </th>
                <th className="border border-slate-200 py-1 px-2 text-sm">
                  Status
                </th>
                <th className="border border-slate-200 py-1 px-2 text-sm">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction: any, index: number) => (
                <tr key={index}>
                  <td className="border border-slate-200 py-1 px-2 text-sm">
                    {index + 1}
                  </td>
                  <td className="border border-slate-200 py-1 px-2 text-sm">
                    {transaction.order_id}
                  </td>
                  <td className="border border-slate-200 py-1 px-2 text-sm">
                    {transaction.user.fullname}
                  </td>
                  <td className="border border-slate-200 py-1 px-2 text-sm">
                    {convertIDR(transaction.total)}
                  </td>
                  <td className="border border-slate-200 py-1 px-2 text-sm">
                    {transaction.status}
                  </td>
                  <td className="border border-slate-200 py-1 px-2 text-sm">
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        className=""
                        onClick={() => setDetailOrder(transaction)}
                      >
                        <i className="bx bx-dots-vertical-rounded"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {Object.keys(detailOrder).length > 0 ? (
        <ModalDetailOrder
          products={products}
          detailOrder={detailOrder}
          setDetailOrder={setDetailOrder}
        />
      ) : null}
    </>
  );
};

export default AdminOrderView;
