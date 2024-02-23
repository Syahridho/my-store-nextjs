import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import ModalUpdateUser from "./ModalUpdateUser";

type PropTypes = {
  users: any;
};

const UsersAdminView = (props: PropTypes) => {
  const [updateUser, setUpdateUser] = useState<any>({});
  const { users } = props;
  return (
    <>
      <AdminLayout>
        <div className="p-12">
          <h1 className="text-xl font-semibold">User Management</h1>
          <table className="border-collapse border border-slate-500 w-full mt-4">
            <thead className="bg-gray-300">
              <tr>
                <th className="border border-slate-200 py-1 px-2 text-sm">#</th>
                <th className="border border-slate-200 py-1 px-2 text-sm">
                  Fullname
                </th>
                <th className="border border-slate-200 py-1 px-2 text-sm">
                  Email
                </th>
                <th className="border border-slate-200 py-1 px-2 text-sm">
                  Phone
                </th>
                <th className="border border-slate-200 py-1 px-2 text-sm">
                  Role
                </th>
                <th className="border border-slate-200 py-1 px-2 text-sm">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any, index: number) => (
                <tr key={user.id}>
                  <td className="border border-slate-200 py-1 px-2 text-sm">
                    {index + 1}
                  </td>
                  <td className="border border-slate-200 py-1 px-2 text-sm">
                    {user.fullname}
                  </td>
                  <td className="border border-slate-200 py-1 px-2 text-sm">
                    {user.email}
                  </td>
                  <td className="border border-slate-200 py-1 px-2 text-sm">
                    {user.phone}
                  </td>
                  <td className="border border-slate-200 py-1 px-2 text-sm">
                    {user.role}
                  </td>
                  <td className="border border-slate-200 py-1 px-2 text-sm">
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="bg-slate-800 text-white hover:bg-slate-700"
                        className="px-2"
                        onClick={() => setUpdateUser(user)}
                      >
                        Update
                      </Button>
                      <Button
                        type="button"
                        variant="bg-red-600 text-white hover:bg-red-700 border-red-600"
                        className="px-2"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {Object.keys(updateUser).length && (
        <ModalUpdateUser
          updateUser={updateUser}
          setUpdateUser={setUpdateUser}
        />
      )}
    </>
  );
};

export default UsersAdminView;
