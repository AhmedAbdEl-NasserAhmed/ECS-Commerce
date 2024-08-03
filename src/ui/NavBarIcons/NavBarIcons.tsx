"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Cart from "../Cart/Cart";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { useAppSelector } from "@/lib/hooks";
import { UserType } from "@/types/enums";
import UserGreeting from "../UserGreeting/UserGreeting";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { HiOutlineHeart } from "react-icons/hi2";
import WishListMenu from "../WishListMenu/WishListMenu";

function NavIcons() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return;

  return (
    <div className=" relative flex items-center justify-between gap-8 xl:gap-6">
      <ProfileMenu />

      <Cart />

      <WishListMenu />

      <LanguageSelector />
    </div>
  );
}

export default NavIcons;
