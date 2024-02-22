import Sidebar from "@/components/fragments/Sidebar";

type Propstypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "bxs-dashboard",
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: "bxs-box",
  },
];

const AdminLayout = (props: Propstypes) => {
  const { children } = props;
  return (
    <div>
      <Sidebar lists={listSidebarItem} />
      {children}
    </div>
  );
};

export default AdminLayout;
