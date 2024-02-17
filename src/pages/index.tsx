import { useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
