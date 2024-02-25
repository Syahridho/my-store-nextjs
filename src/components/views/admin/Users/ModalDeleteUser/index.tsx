import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";

const ModalDeleteUser = (props: any) => {
  const { deleteUser, setDeleteUser, setUsersData } = props;
  const session: any = useSession();

  const handleDelete = async () => {
    userServices.deleteUser(deleteUser.id, session.data?.accessToken);
    setDeleteUser({});
    const { data } = await userServices.getAllUser();
    setUsersData(data.data);
  };

  return (
    <Modal onClose={() => setDeleteUser({})}>
      <h1 className="text-center font-semibold text-xl">Are you sure</h1>
      <Button
        type="button"
        variant="bg-red-500 border-red-500 text-white shadow"
        className="w-52 text-center mx-auto mt-6"
        onClick={() => handleDelete()}
      >
        Delete
      </Button>
    </Modal>
  );
};

export default ModalDeleteUser;
