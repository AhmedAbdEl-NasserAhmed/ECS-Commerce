"use client";

import styles from "./layout.module.scss";
import Navbar from "@/components/AdminDashboard/Navbar";
import Links from "@/components/AdminDashboard/Links";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

function AdminPage({ children }: Props) {
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <div className="overflow-hidden  h-[100vh] ">
      <div className="grid grid-cols-[max-Content_5fr] h-full bg-white rounded-2xl  shadow-lg ">
        <Links expand={expand} />
        <div>
          <Navbar setExpand={setExpand} />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
