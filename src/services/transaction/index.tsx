import instance from "@/lib/axios/instance";

const endPoint = {
  transaction: "/api/transaction",
};

const transactionServices = {
  getTransaction: (order_id: string) =>
    instance.get(`${endPoint.transaction}?order_id=${order_id}`),
  getAllTransaction: () => instance.get(`${endPoint.transaction}/admin`),
  generateTransaction: (data: any) => instance.post(endPoint.transaction, data),
  updateTransaction: (order_id: string) =>
    instance.put(`${endPoint.transaction}?order_id=${order_id}`),
};

export default transactionServices;
