"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { HiOutlineLogin, HiOutlineUserAdd } from "react-icons/hi";
import { useTranslations } from "next-intl";

function GuestMenu({ setIsProfileOpen }) {
  const { locale } = useParams();

  const user = useTranslations("user");

  return (
    <ul className=" absolute text-xl -start-14 top-14 bg-white  flex flex-col z-20 gap-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-2 w-48 font-semibold text-center   rounded-lg">
      <li className="p-2 hover:bg-gray-200 duration-200 transition-all">
        <Link
          className="flex items-center justify-center gap-4"
          onClick={() => setIsProfileOpen(false)}
          href={`/${locale}/user/login`}
        >
          <span className="text-3xl">
            <HiOutlineLogin />
          </span>
          <span>{user("Log in")}</span>
        </Link>
      </li>
      <li className="p-2 hover:bg-gray-200 duration-200 transition-all">
        <Link
          className="flex items-center justify-center gap-4"
          onClick={() => setIsProfileOpen(false)}
          href={`/${locale}/user/register`}
        >
          <span className="text-3xl">
            <HiOutlineUserAdd />
          </span>
          <span>{user("Sign up")}</span>
        </Link>
      </li>
    </ul>
  );
}

export default GuestMenu;
