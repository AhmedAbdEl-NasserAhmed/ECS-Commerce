"use client";

import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

function UserGreeting({ onClick }) {
  const user = useAppSelector((state) => state.usersSlice.user);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return;

  return (
    <li
      className="text-2xl font-semibold cursor-pointer flex items-center gap-4"
      onClick={onClick}
    >
      <h2>
        Hey , <span className="capitalize">{user?.name}</span>{" "}
      </h2>
      <span>
        <HiChevronDown />
      </span>
    </li>
  );
}

export default UserGreeting;
