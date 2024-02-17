import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { push, query } = useRouter();
  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

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
        setError("Email or password is incorrect");
      }
    } catch {
      setIsLoading(false);
      setError("Email or password is incorrect");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="font-bold text-2xl pb-4">Login</h1>
      <div className="min-w-96 border rounded px-8 py-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-2">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              name="email"
              id="email"
              type="email"
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
              type="password"
              className="border rounded mt-1 px-2 py-1.5 bg-slate-50"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full my-2 py-1.5 rounded bg-blue-950 text-white text-center transition duration-500 hover:bg-blue-900"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <hr className="my-4" />
        <button
          type="button"
          className="w-full my-2 py-1.5 rounded border border-blue-950 bg-white text-blue-950  flex items-center justify-center transition duration-500 hover:bg-slate-100"
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
        >
          <i className="bx bxl-google font-semibold mx-2"></i> Login With Google
        </button>
      </div>
      <p className="my-4">
        Don&apos;t have an account? Sign Up{" "}
        <Link href="/auth/register" className="text-blue-500 hover:underline">
          here
        </Link>
      </p>
    </div>
  );
};

export default LoginView;
