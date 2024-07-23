"use client";

import Image from "next/image";
import { useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Cart from "../Cart/Cart";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { useAppSelector } from "@/lib/hooks";
import { UserType } from "@/types/enums";
import UserGreeting from "../UserGreeting/UserGreeting";
import LanguageSelector from "../LanguageSelector/LanguageSelector";

function NavIcons() {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const user = useAppSelector((state) => state.usersSlice.user);

  const makePayment = useAppSelector((state) => state.cartSlice.makePayment);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const cart = useAppSelector((state) => state.cartSlice.cartItems);

  function handleLoginClick() {
    setIsProfileOpen((open) => !open);
  }

  return (
    <ul className=" relative flex items-center justify-between gap-4 xl:gap-6 me-4">
      {user && user.isActive ? (
        <UserGreeting onClick={handleLoginClick} />
      ) : (
        <li onClick={handleLoginClick}>
          <Image
            src="/profile.png"
            alt="profile"
            width={22}
            height={22}
            className="cursor-pointer"
          />
        </li>
      )}

      {isProfileOpen && <ProfileMenu setIsProfileOpen={setIsProfileOpen} />}

      {user?.role !== UserType.ADMIN && !makePayment && (
        <li
          className="relative"
          onClick={() => {
            setIsCartOpen((open) => !open);
          }}
        >
          <Image
            src="/cart.png"
            alt="cart"
            width={22}
            height={22}
            className="cursor-pointer"
          />
          <span className="absolute w-6 h-6  rounded-full text-sm bg-red-500 -top-3 z-10 flex items-center justify-center text-white  -right-3">
            {cart?.length}
          </span>
        </li>
      )}
      <LanguageSelector />
      {isCartOpen && user?.role !== UserType.ADMIN && !makePayment && (
        <Cart setIsCartOpen={setIsCartOpen} />
      )}
    </ul>
  );
}

export default NavIcons;
