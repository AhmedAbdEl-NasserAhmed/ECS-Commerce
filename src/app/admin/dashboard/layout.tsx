"use client";

import Navbar from "@/components/AdminDashboard/Navbar";
import Links from "@/components/AdminDashboard/Links";
import { useState } from "react";
import Accordian from "@/ui/Accordian/Accordian";

interface Props {
  children: React.ReactNode;
}

function AdminPage({ children }: Props) {
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <div className="overflow-hidden  h-[100vh] ">
      <div className="grid grid-cols-[max-Content_5fr] h-full bg-white rounded-2xl  shadow-lg ">
        <Accordian>
          <Links setExpand={setExpand} expand={expand} />
        </Accordian>
        <div className="col-span-full lg:col-auto">
          <Navbar setExpand={setExpand} />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
