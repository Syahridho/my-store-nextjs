import ProductsAdminView from "@/components/views/admin/Products";
import userServices from "@/services/user";
import { useEffect, useState } from "react";

const AdminProductsPage = ({ setToaster }: any) => {
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
      <ProductsAdminView users={users} setToaster={setToaster} />
    </>
  );
};

export default AdminProductsPage;
