import SuccessView from "@/components/views/Transaction/Success";
import { ToasterContext } from "@/context/ToasterContext";
import transactionServices from "@/services/transaction";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const TransactionSuccessPage = () => {
  const { query, isReady } = useRouter();

  const { setToaster } = useContext(ToasterContext);
  const checkPayment = async () => {
    await transactionServices.updateTransaction(query.order_id as string);
  };
  useEffect(() => {
    if (isReady) {
      checkPayment();
    }
  }, [isReady]);
  return (
    <>
      <SuccessView />
    </>
  );
};

export default TransactionSuccessPage;
