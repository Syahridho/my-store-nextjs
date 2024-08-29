import UsersAdminView from "@/components/views/Admin/Users";
import userServices from "@/services/user";
import { useEffect, useState } from "react";

const AdminUsersPage = () => {
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
      <UsersAdminView users={users} />
    </>
  );
};

export default AdminUsersPage;
