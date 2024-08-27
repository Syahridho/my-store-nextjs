import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import userServices from "@/services/user";
import { User } from "@/types/user.type";

type PropTypes = {
  setUsersData: Dispatch<SetStateAction<User[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  updateUser: User | any;
  setUpdateUser: Dispatch<SetStateAction<{}>>;
};

const ModalUpdateUser = (props: PropTypes) => {
  const { updateUser, setUpdateUser, setUsersData, setToaster } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      role: form.role.value,
    };

    const result = await userServices.updateUser(updateUser.id, data);
    if (result.status === 200) {
      setIsLoading(false);
      setUpdateUser({});
      const { data } = await userServices.getAllUser();
      setUsersData(data.data);
      setToaster({
        variant: "success",
        message: "Success Update",
      });
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Update",
      });
    }
  };
  return (
    <Modal onClose={() => setUpdateUser({})}>
      <h1 className="text-center font-semibold text-xl mb-2">Update user</h1>
      <form onSubmit={handleUpdateUser}>
        <Input
          label="Email"
          name="email"
          type="email"
          defaultValue={updateUser.email}
          disabled
        />
        <Input
          label="Fullname"
          name="fullname"
          type="text"
          defaultValue={updateUser.fullname}
          disabled
        />
        <Input
          label="Phone"
          name="phone"
          type="number"
          defaultValue={updateUser.phone}
          disabled
        />
        <Select
          label="Role"
          name="role"
          defaultValue={updateUser.role}
          options={[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
          ]}
        ></Select>
        <Button
          type="submit"
          variant="bg-slate-800 text-white hover:bg-slate-900"
          className="mt-8 px-8 float-end"
        >
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
