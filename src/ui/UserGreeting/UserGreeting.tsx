"use client";

import { useAppSelector } from "@/lib/hooks";

function UserGreeting({ onClick }) {
  const user = useAppSelector((state) => state.usersSlice.user);

  return (
    <li className="text-2xl font-semibold cursor-pointer" onClick={onClick}>
      {" "}
      Hey , {user?.name} 👋
    </li>
  );
}

export default UserGreeting;
