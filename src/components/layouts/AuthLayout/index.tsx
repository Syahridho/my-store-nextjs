import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type PropsTypes = {
  title?: string;
  children: React.ReactNode;
  link: string;
  linkText?: string;

  setToaster: Dispatch<SetStateAction<{}>>;
};

const AuthLayout = (props: PropsTypes) => {
  const { title, children, link, linkText } = props;
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="font-bold text-2xl pb-4">{title}</h1>
      <div className="min-w-96 border rounded px-8 py-8">{children}</div>
      <p className="my-4">
        {linkText}
        <Link href={link} className="text-blue-500 hover:underline">
          here
        </Link>
      </p>
    </div>
  );
};

export default AuthLayout;
