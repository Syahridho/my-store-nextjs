import Button from "@/components/ui/Button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

type Propstypes = {
  lists: Array<{
    title: string;
    url: string;
    icon: string;
  }>;
};

const Sidebar = (props: Propstypes) => {
  const { lists } = props;
  const { pathname } = useRouter();
  return (
    <div className="bg-slate-800 text-white p-5 w-60 h-screen flex flex-col justify-between sticky left-0 top-0">
      <div className="">
        <h1 className="mb-7 font-bold text-center text-lg">Admin Panel</h1>
        <div className="flex flex-col gap-3">
          {lists.map((list, index) => (
            <Link
              href={list.url}
              key={list.title}
              className={`flex items-center gap-2 text-base px-3 py-1 rounded transition duration-500 hover:bg-white hover:text-slate-800 ${
                pathname === list.url && "bg-white text-slate-800"
              }`}
            >
              <i className={`bx ${list.icon} text-xl `}></i>
              <h4 className="">{list.title}</h4>
            </Link>
          ))}
        </div>
      </div>
      <div className="">
        <Button
          type="button"
          variant="bg-red-500 text-whites hover:bg-red-700 px-4"
          onClick={() => signOut()}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
