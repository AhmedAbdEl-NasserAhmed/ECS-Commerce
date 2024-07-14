"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cart from "../Cart/Cart";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { useAppSelector } from "@/lib/hooks";

function NavIcons() {
  const router = useRouter();

  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const isLoggedIn = false;

  const cart = useAppSelector((state) => state.cartSlice.cartItems);

  function handleLoginClick() {
    if (!isLoggedIn) {
      // router.push("/login");
    }
    setIsProfileOpen((open) => !open);
  }

  return (
    <ul className=" relative flex items-center justify-between gap-4 xl:gap-6 me-4">
      <li onClick={handleLoginClick}>
        <Image
          src="/profile.png"
          alt="profile"
          width={22}
          height={22}
          className="cursor-pointer"
        />
      </li>
      {isProfileOpen && <ProfileMenu setIsProfileOpen={setIsProfileOpen} />}
      <li>
        <Image
          src="/notification.png"
          alt="notification"
          width={22}
          height={22}
          className="cursor-pointer"
        />
      </li>
      <li className="relative" onClick={() => setIsCartOpen((open) => !open)}>
        <Image
          src="/cart.png"
          alt="cart"
          width={22}
          height={22}
          className="cursor-pointer"
        />
        <span className="absolute w-6 h-6  rounded-full text-sm bg-red-500 -top-3 z-10 flex items-center justify-center text-white  -right-3">
          {cart.length}
        </span>
      </li>

      {isCartOpen && <Cart setIsCartOpen={setIsCartOpen} />}
    </ul>
  );
}

export default NavIcons;
