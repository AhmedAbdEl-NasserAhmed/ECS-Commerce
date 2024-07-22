"use client";

import Link from "next/link";
import useClickOutside from "@/hooks/useClickOutside";
import { useParams } from "next/navigation";
import { HiOutlineLogin, HiOutlineUserAdd } from "react-icons/hi";

function GuestMenu({ setIsProfileOpen }) {
  const { locale } = useParams();

  const ref = useClickOutside({ close: setIsProfileOpen, value: false });
  return (
    <ul
      ref={ref}
      className=" absolute text-xl -left-14 top-14 bg-white  flex flex-col z-20 gap-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-2 w-48 font-semibold text-center   rounded-lg"
    >
      <li className="p-2 hover:bg-gray-200 duration-200 transition-all">
        <Link
          className="flex items-center justify-center gap-4"
          onClick={() => setIsProfileOpen(false)}
          href={`/${locale}/user/login`}
        >
          <span className="text-3xl">
            <HiOutlineLogin />
          </span>
          <span>Log in</span>
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
          <span>Sign Up </span>
        </Link>
      </li>
    </ul>
  );
}

export default GuestMenu;
