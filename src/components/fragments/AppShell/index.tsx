import Head from "next/head";
import Navbar from "@/components/fragments/Navbar";
import Toaster from "@/components/ui/Toaster";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { ToasterContext } from "@/context/ToasterContext";
import { ToasterType } from "@/types/toaster.type";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const disableNavbar = ["auth", "admin", "member"];

type PropTypes = {
  children: React.ReactNode;
};

const AppShell = (props: PropTypes) => {
  const { children } = props;
  const { pathname } = useRouter();
  const { toaster }: ToasterType = useContext(ToasterContext);

  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className={poppins.className}>
        {!disableNavbar.includes(pathname.split("/")[1]) && <Navbar />}
        {children}
        {Object.keys(toaster).length > 0 && <Toaster />}
      </div>
    </>
  );
};

export default AppShell;
