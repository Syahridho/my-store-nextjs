import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";

const ModalUpdateUser = (props: any) => {
  const { updateUser, setUpdateUser } = props;
  return (
    <Modal onClose={() => setUpdateUser({})}>
      <h1 className="text-center font-semibold text-xl mb-2">Update user</h1>
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
    </Modal>
  );
};

export default ModalUpdateUser;
