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
  const [expanded, setExpanded] = useState<string | false>(false);

  return (
    <div className=" h-[100vh]">
      <ProtectedRoute>
        <div className="grid grid-cols-[max-Content_5fr] bg-[#F5F5F5] rounded-2xl">
          <Accordian>
            <Links
              expanded={expanded}
              setExpanded={setExpanded}
              setExpand={setExpand}
              expand={expand}
            />
          </Accordian>
          <div className="col-span-full lg:col-auto">
            <Navbar setExpand={setExpand} setExpanded={setExpanded} />
            <div>{children}</div>
          </div>
        </div>
      </ProtectedRoute>
    </div>
  );
}

export default AdminPage;
