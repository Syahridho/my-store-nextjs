import Button from "@/components/ui/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const NavItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Products",
    url: "/products",
  },
];

const Navbar = () => {
  const { data }: any = useSession();
  const { pathname } = useRouter();

  const [dropdownUser, setDropdownUser] = useState(false);

  return (
    <div className="flex justify-between items-center bg-white py-4 px-12 shadow">
      <h1 className="text-slate-800 font-semibold text-lg">Toko Saya</h1>
      <div className="flex gap-5 h-full">
        {NavItems.map((item: any) => (
          <Link
            key={item.title}
            href={item.url}
            className={`text-slate-600 h-full flex items-center  ${
              pathname === item.url &&
              "font-semibold border-b-2 border-slate-500"
            }`}
          >
            {item.title}
          </Link>
        ))}
      </div>
      {data ? (
        <div className="flex items-center gap-4">
          <Link href="/cart" className="text-xl  p-1">
            <i className="bx bx-cart"></i>
          </Link>
          <div className="relative">
            <Image
              width={40}
              height={40}
              src={data?.user.image}
              alt={data?.user.name}
              className="rounded bg-cover cursor-pointer"
              onClick={() => setDropdownUser(!dropdownUser)}
            />

            <div
              className={`absolute bg-slate-50 right-0 top-10 shadow-md flex-col gap-1 first:rounded-t last:rounded-b ${
                dropdownUser ? "flex" : "hidden"
              }`}
            >
              <Link
                href={"/member/profile"}
                className="w-full pl-2 bg-slate-100 text-slate-500 block py-1.5 hover:bg-slate-200"
              >
                Profile
              </Link>

              <button
                onClick={() => signOut()}
                className={
                  "pl-2 w-28 !text-left py-1.5 transition duration-500 bg-red-50 text-red-500 hover:bg-red-300  "
                }
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          className="py-1 px-5 my-0"
          onClick={() => signIn()}
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default Navbar;
