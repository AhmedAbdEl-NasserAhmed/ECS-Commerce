"use client";

import { useAppSelector } from "@/lib/hooks";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

function UserGreeting({ onClick }) {
  const user = useAppSelector((state) => state.usersSlice.user);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const userTranslation = useTranslations("user");

  if (!isClient) return;

  return (
    <div
      className="text-2xl font-semibold cursor-pointer flex items-center gap-4"
      onClick={onClick}
    >
      <h2>
        {userTranslation("Hey")} ,{" "}
        <span className="capitalize">{user?.name}</span>{" "}
      </h2>
      <span>
        <HiChevronDown />
      </span>
    </div>
  );
}

export default UserGreeting;
