import Sidebar from "@/components/fragments/Sidebar";

type Propstypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/member",
    icon: "bxs-dashboard",
  },
  {
    title: "Orders",
    url: "/member/orders",
    icon: "bxs-cart",
  },
  {
    title: "Profile",
    url: "/member/profile",
    icon: "bxs-user",
  },
];

const MemberLayout = (props: Propstypes) => {
  const { children } = props;
  return (
    <div className="flex">
      <Sidebar lists={listSidebarItem} />
      <div className="w-full p-10">{children}</div>
    </div>
  );
};

export default MemberLayout;
