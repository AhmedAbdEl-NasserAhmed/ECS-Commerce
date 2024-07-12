"use client";

import Link from "next/link";
import useClickOutside from "@/hooks/useClickOutside";
import { useParams } from "next/navigation";

function GuestMenu({ setIsProfileOpen }) {
  const { locale } = useParams();

  const ref = useClickOutside({ close: setIsProfileOpen, value: false });
  return (
    <ul
      ref={ref}
      className=" absolute text-xl left-0 top-12 bg-white  flex flex-col z-20 gap-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  p-4 rounded-md"
    >
      <li>
        <Link
          onClick={() => setIsProfileOpen(false)}
          href={`/${locale}/user/login`}
        >
          Log in
        </Link>
      </li>
      <li>
        <Link
          onClick={() => setIsProfileOpen(false)}
          href={`/${locale}/user/register`}
        >
          Sign up{" "}
        </Link>
      </li>
    </ul>
  );
}

export default GuestMenu;
