import Link from "next/link";
import { FormEvent, use, useState } from "react";
import { useRouter } from "next/router";

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
          <div className="flex flex-col mb-2">
            <label htmlFor="fullname" className="font-medium">
              FullName
            </label>
            <input
              name="fullname"
              id="fullname"
              type="text"
              className="border rounded mt-1 px-2 py-1.5 bg-slate-50 "
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              name="email"
              id="email"
              type="text"
              className="border rounded mt-1 px-2 py-1.5 bg-slate-50"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="phone" className="font-medium">
              Phone
            </label>
            <input
              name="phone"
              id="phone"
              type="text"
              className="border rounded mt-1 px-2 py-1.5 bg-slate-50"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              name="password"
              id="password"
              type="text"
              className="border rounded mt-1 px-2 py-1.5 bg-slate-50"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full my-2 py-1.5 rounded bg-blue-950 text-white text-center transition duration-500 hover:bg-blue-900"
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
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
