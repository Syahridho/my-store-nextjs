import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { push } = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email is already register");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="font-bold text-2xl pb-4">Register</h1>
      <div className="min-w-96 border rounded px-8 py-8">
        <form onSubmit={handleSubmit}>
          <Input label="Email" name="email" type="email" />
          <Input label="Fullname" name="fullname" type="text" />
          <Input label="Phone" name="phone" type="number" />
          <Input label="Password" name="password" type="password" />
          {error && <p className="text-red-500">{error}</p>}
          <Button
            type="submit"
            variant="bg-blue-950 text-white hover:bg-blue-900"
          >
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </form>
      </div>
      <p className="my-4">
        Have an account? Sign in{" "}
        <Link href="/auth/login" className="text-blue-500 hover:underline">
          here
        </Link>
      </p>
    </div>
  );
};

export default RegisterView;
