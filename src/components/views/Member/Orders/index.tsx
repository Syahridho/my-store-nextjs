import MemberLayout from "@/components/layouts/MemberLayout";
import Button from "@/components/ui/Button";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import { convertIDR } from "@/utils/currency";
import Script from "next/script";
import { useEffect, useState } from "react";

const OrdersMemberView = (props: any) => {
  const [profile, setProfile] = useState<any>({});

  const getProfile = async () => {
    const { data } = await userServices.getProfile();
    setProfile(data.data);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />

      <MemberLayout>
        <div className="p-12">
          <h1 className="text-xl font-semibold">User Management</h1>
          <table className="border-collapse border border-slate-500 w-full mt-4">
            <thead className="bg-gray-300">
              <tr>
                <th className="border border-slate-200 py-1 px-2 text-sm">#</th>
                <th className="border border-slate-200 py-1 px-2 text-sm">
                  Order Id
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
              {profile?.transaction?.map((transaction: any, index: number) => (
                <tr key={transaction.order_id}>
                  <td className="border border-slate-200 py-1 px-2 text-sm">
                    {index + 1}
                  </td>
                  <td className="border border-slate-200 py-1 px-2 text-sm">
                    {transaction.order_id}
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
                        // onClick={() => setUpdateUser(user)}
                      >
                        <i className="bx bx-dots-vertical-rounded"></i>
                      </Button>
                      <Button
                        type="button"
                        className=""
                        onClick={() => {
                          window.snap.pay(transaction.token);
                        }}
                        disabled={transaction.status !== "pending"}
                      >
                        <i className="bx bx-money"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MemberLayout>
    </>
  );
};

export default OrdersMemberView;
