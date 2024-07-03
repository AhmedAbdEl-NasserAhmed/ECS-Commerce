"use client";

import Navbar from "@/components/AdminDashboard/Navbar";
import Links from "@/components/AdminDashboard/Links";
import { useState } from "react";
import Accordian from "@/ui/Accordian/Accordian";
import ProtectedRoute from "@/ui/ProtectedRoute/ProtectedRoute";

interface Props {
  children: React.ReactNode;
}

function AdminPage({ children }: Props) {
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <div className=" h-[100vh] ">
      <ProtectedRoute>
        <div className="grid grid-cols-[max-Content_5fr]  bg-white rounded-2xl  shadow-lg ">
          <Accordian>
            <Links setExpand={setExpand} expand={expand} />
          </Accordian>
          <div className="col-span-full lg:col-auto">
            <Navbar setExpand={setExpand} />
            <div>{children}</div>
          </div>
        </div>
      </ProtectedRoute>
    </div>
  );
}

export default AdminPage;
