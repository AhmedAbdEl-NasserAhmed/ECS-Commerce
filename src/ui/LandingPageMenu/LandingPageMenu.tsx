"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function LandingPageMenu() {
  const [opens, setOpens] = useState<boolean>(false);

  return (
    <div className="md:hidden">
      <Image
        src="/menu.png"
        alt="Burger Menu"
        width={20}
        height={20}
        onClick={() => setOpens((opens) => !opens)}
        className="cursor-pointer"
      />
      {opens && (
        <ul className="fixed h-screen w-full gap-8 bg-black z-[1000] text-white text-3xl flex flex-col items-center justify-center left-0 top-0 ">
          <li>
            <Link href="">Home Page</Link>
          </li>
          <li>
            <Link href="">Shop</Link>
          </li>
          <li>
            <Link href="">Deals</Link>
          </li>
          <li>
            <Link href="">About</Link>
          </li>
          <li>
            <Link href="">Contact</Link>
          </li>
          <li>
            <Link href="">Logout</Link>
          </li>
          <li>
            <Link href="">Cart(1)</Link>
          </li>
          <span
            onClick={() => setOpens(false)}
            className="text-6xl absolute top-4 right-4 cursor-pointer"
          >
            &times;
          </span>
        </ul>
      )}
    </div>
  );
}

export default LandingPageMenu;
