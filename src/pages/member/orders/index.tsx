import OrdersMemberView from "@/components/views/Member/Orders";
import userServices from "@/services/user";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getAllUser();
      setUsers(data.data);
    };
    getAllUsers();
  }, []);
  return (
    <>
      <OrdersMemberView users={users} />
    </>
  );
};

export default OrdersPage;
