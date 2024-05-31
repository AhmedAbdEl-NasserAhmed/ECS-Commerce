"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineBell } from "react-icons/hi2";
import ResponsiveMenuLinks from "./ResponsiveMenuLinks";

function Navbar() {
  const [showMenuLinks, setShowMenuLinks] = useState<boolean>(false);

  return (
    <nav className="relative px-6 py-8 h-[8vh]  bg-white col-span-full flex items-center justify-between border-b-2 border-neutral-100 ">
      <Link
        href="/"
        className="text-md sm:text-xl md:text-2xl font-bold text-cyan-400 "
      >
        PETI TECH
      </Link>
      <ul className="flex items-center gap-3 sm:gap-6 md:gap-8 text-2xl sm:text-3xl">
        <li className="  flex justify-center items-center gap-2 ">
          <div className=" sm:w-[3rem] w-[1.8rem] h-[1.8rem] sm:h-[3rem] relative ">
            <Image
              className="rounded-full  "
              src="/profile.webp"
              fill
              sizes="10vw"
              alt="Profile photo"
            />
          </div>
          <span>
            <FaAngleDown />
          </span>
        </li>
        <li>
          <HiOutlineSearch />
        </li>
        <li>
          <HiOutlineBell />
        </li>
      </ul>
      <Image
        onClick={() => setShowMenuLinks((show) => !show)}
        className="cursor-pointer md:hidden"
        src="/menu.png"
        alt="menu"
        width={16}
        height={42}
      />

      {showMenuLinks && (
        <ResponsiveMenuLinks setShowMenuLinks={setShowMenuLinks} />
      )}
    </nav>
  );
}

export default Navbar;
