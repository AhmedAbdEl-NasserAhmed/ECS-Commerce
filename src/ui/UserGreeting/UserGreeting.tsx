"use client";

import { useAppSelector } from "@/lib/hooks";
import { HiChevronDown } from "react-icons/hi2";

function UserGreeting({ onClick }) {
  const user = useAppSelector((state) => state.usersSlice.user);

  return (
    <li
      className="text-2xl font-semibold cursor-pointer flex items-center gap-4"
      onClick={onClick}
    >
      <span>Hey , {user?.name} </span>
      <span>
        <HiChevronDown />
      </span>
    </li>
  );
}

export default UserGreeting;
