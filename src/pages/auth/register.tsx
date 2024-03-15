import RegisterView from "@/components/views/auth/Register";
import { Dispatch, SetStateAction } from "react";

const RegisterPage = ({
  setToaster,
}: {
  setToaster: Dispatch<SetStateAction<{}>>;
}) => {
  return (
    <>
      <RegisterView setToaster={setToaster} />
    </>
  );
};

export default RegisterPage;
