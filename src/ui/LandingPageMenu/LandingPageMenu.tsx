"use client";

import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CartSideMenu from "../CartSideMenu/CartSideMenu";

function LandingPageMenu() {
  const [opens, setOpens] = useState<boolean>(false);

  const [openSideMenu, setOpenSideMenu] = useState<boolean>(false);

  const cart = useAppSelector((state) => state.cartSlice.cartItems);

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
          <li onClick={() => setOpenSideMenu(true)}>
            <Link href="">Cart ({cart.length})</Link>
          </li>
          <span
            onClick={() => setOpens(false)}
            className="text-6xl absolute top-4 right-4 cursor-pointer"
          >
            &times;
          </span>
          <CartSideMenu
            setOpenSideMenu={setOpenSideMenu}
            openSideMenu={openSideMenu}
          />
        </ul>
      )}
    </div>
  );
}

export default LandingPageMenu;
