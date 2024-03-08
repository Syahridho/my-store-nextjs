import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/layouts/AuthLayout";

const LoginView = ({
  setToaster,
}: {
  setToaster: Dispatch<SetStateAction<{}>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { push, query } = useRouter();
  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target as HTMLFormElement;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });
      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setToaster({
          variant: "danger",
          message: "Email or password is incorrect",
        });
      }
    } catch {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Login Failed, plese call support",
      });
    }
  };
  return (
    <AuthLayout
      title="Login"
      link="/auth/register"
      linkText="Don't have an account? Sign Up "
      setToaster={setToaster}
    >
      <form onSubmit={handleSubmit}>
        <Input label="Email" name="email" type="email" />
        <Input label="Password" name="password" type="Password" />

        <Button
          type="submit"
          className="w-full"
          variant="bg-blue-950 text-white hover:bg-blue-900"
        >
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
      <hr className="my-4" />
      <Button
        type="button"
        className="w-full"
        onClick={() => signIn("google", { callbackUrl, redirect: false })}
      >
        <i className="bx bxl-google font-semibold mx-2"></i> Login With Google
      </Button>
    </AuthLayout>
  );
};

export default LoginView;
