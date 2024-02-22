import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data } = useSession();
  return (
    <div className="flex justify-between items-center bg-blue-950 py-4 px-12">
      <h1 className="text-white">Toko Saya</h1>
      <button
        onClick={() => (data ? signOut() : signIn())}
        className={`px-4 py-1 rounded transition duration-500 ${
          data
            ? "bg-red-500 text-white hover:bg-red-700"
            : "bg-white text-blue-900 hover:bg-blue-50"
        } `}
      >
        {data ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default Navbar;
