import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import { Dispatch, SetStateAction, useState } from "react";

type PropTypes = {
  setUsersData: Dispatch<SetStateAction<User[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  deleteUser: User | any;
  setDeleteUser: Dispatch<SetStateAction<{}>>;
  session: any;
};

const ModalDeleteUser = (props: PropTypes) => {
  const { deleteUser, setDeleteUser, setUsersData, setToaster, session } =
    props;
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const result = await userServices.deleteUser(
      deleteUser.id,
      session.data?.accessToken
    );

    if (result.status === 200) {
      setIsLoading(false);
      setToaster({
        variant: "success",
        message: "Success Delete",
      });
      setDeleteUser({});
      const { data } = await userServices.getAllUser();
      setUsersData(data.data);
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Delete",
      });
    }
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
