"use client";

import styles from "./layout.module.scss";
import Navbar from "@/components/AdminDashboard/Navbar";
import Links from "@/components/AdminDashboard/Links";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

function AdminPage({ children }: Props) {
  const [showMenuLinks, setShowMenuLinks] = useState<boolean>(false);

  return (
    <div className="bg-gradient-to-r from-mainColor to-cyan-500 overflow-hidden  h-[100vh] px-3 py-3  ">
      <div
        className={`${styles.container} bg-white rounded-2xl ${
          showMenuLinks ? "overflow-hidden" : "overflow-y-scroll"
        }  shadow-lg  `}
      >
        <Navbar
          showMenuLinks={showMenuLinks}
          setShowMenuLinks={setShowMenuLinks}
        />
        <Links />
        <div className="col-span-full md:col-auto ">{children}</div>
      </div>
    </div>
  );
}

export default AdminPage;
