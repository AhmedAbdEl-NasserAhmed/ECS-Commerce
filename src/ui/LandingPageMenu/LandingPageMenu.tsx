"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CartSideMenu from "../CartSideMenu/CartSideMenu";
import { logoutUser } from "@/lib/features/usersSlice/usersSlice";
import { useParams, usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import MobileScreenCategoriesList from "../MobileScreenCategoriesList/MobileScreenCategoriesList";
import { handleLink } from "@/lib/helpers";

function LandingPageMenu() {
  const [opens, setOpens] = useState<boolean>(false);

  const { locale } = useParams();

  const pathName = usePathname();

  const router = useRouter();

  const [openSideMenu, setOpenSideMenu] = useState<boolean>(false);

  const dispatch = useAppDispatch();

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
            <MobileScreenCategoriesList setOpens={setOpens} />
          </li>
          <li>
            <Link href="">Contact</Link>
          </li>
          <li>
            <Link
              onClick={() => setOpens(false)}
              href={handleLink(pathName, locale, "register", `${locale}/user/`)}
            >
              Sign up
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setOpens(false)}
              href={handleLink(pathName, locale, "login", `${locale}/user/`)}
            >
              Log in
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                dispatch(logoutUser());
                localStorage.removeItem("userToken");
                localStorage.removeItem("user");
                setOpens(false);
                router.push(`/${locale}`);
                toast.success("Do Not Be Late");
              }}
              href=""
            >
              Logout
            </Link>
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
            setOpens={setOpens}
            setOpenSideMenu={setOpenSideMenu}
            openSideMenu={openSideMenu}
          />
        </ul>
      )}
    </div>
  );
}

export default LandingPageMenu;
