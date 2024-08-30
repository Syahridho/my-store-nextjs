import instance from "@/lib/axios/instance";

const endPoint = {
  transaction: "/api/transaction",
};

const transactionServices = {
  generateTransaction: (data: any) => instance.post(endPoint.transaction, data),
};

export default transactionServices;
