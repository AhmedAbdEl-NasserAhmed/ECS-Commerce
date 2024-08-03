"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CartSideMenu from "../CartSideMenu/CartSideMenu";
import { logoutUser } from "@/lib/features/usersSlice/usersSlice";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import MobileScreenCategoriesList from "../MobileScreenCategoriesList/MobileScreenCategoriesList";
import { UserType } from "@/types/enums";

import { useSetCartItemsMutation } from "@/lib/features/api/cartItemsApi";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { deleteCookie } from "cookies-next";
import { clearCookiesThunk } from "@/lib/features/cookieSlice/cookieSlice";
import WishListSideMenu from "../WishListSideMenu/WishListSideMenu";
import { HiOutlineViewGrid } from "react-icons/hi";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { useGetAllCategoriesQuery } from "@/lib/features/api/categoriesApi";
import { useTranslations } from "next-intl";

function LandingPageMenu() {
  const [opens, setOpens] = useState<boolean>(false);

  const { locale } = useParams();

  const router = useRouter();

  const [openSideMenu, setOpenSideMenu] = useState<boolean>(false);

  const [openWishListMenu, setOpenWishListMenu] = useState<boolean>(false);

  const [openCategoriesMenu, setOpenCategoriesMenu] = useState<boolean>(false);

  const { data, isLoading } = useGetAllCategoriesQuery("categories");

  const dispatch = useAppDispatch();

  const cart = useAppSelector(
    (state) => state.cookieSlice.cookieItems.cartItems
  );

  const user = useAppSelector((state) => state.usersSlice.user);

  const wishList = useAppSelector(
    (state) => state.cookieSlice.cookieItems.wishListItems
  );

  const userTranslation = useTranslations("user");

  const [cartItems] = useSetCartItemsMutation();

  const userRoleAdmin = user?.role === UserType.ADMIN;

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
        <ul className="fixed h-screen w-full gap-12 bg-black z-[1000] text-white text-3xl flex flex-col items-center justify-center start-0 top-0 ">
          <li>
            <button
              onClick={() => {
                router.replace(`/${locale}`);
                setOpens(false);
              }}
            >
              {userTranslation("Home Page")}
            </button>
          </li>

          {data?.data.length > 0 && (
            <li
              className="flex items-center cursor-pointer"
              onClick={() => setOpenCategoriesMenu((prev) => !prev)}
            >
              {userTranslation("Shop")}

              <span>
                {openCategoriesMenu ? <HiChevronUp /> : <HiChevronDown />}
              </span>
              <MobileScreenCategoriesList
                data={data}
                isLoading={isLoading}
                setOpenCategoriesMenu={setOpenCategoriesMenu}
                openCategoriesMenu={openCategoriesMenu}
              />
            </li>
          )}

          {user?.role === UserType.ADMIN && (
            <li>
              <Link
                className=" flex items-center gap-4 justify-center"
                onClick={() => setOpens(false)}
                href={`/${locale}/admin/dashboard`}
              >
                <span>Dashboard</span>
              </Link>
            </li>
          )}

          {!user?.isActive && (
            <li>
              <button
                onClick={() => {
                  router.replace(`/${locale}/user/register`);
                  setOpens(false);
                }}
              >
                {userTranslation("Sign up")}
              </button>
            </li>
          )}
          {!user?.isActive && (
            <li>
              <button
                onClick={() => {
                  router.replace(`/${locale}/user/login`);
                  setOpens(false);
                }}
              >
                {userTranslation("Log in")}
              </button>
            </li>
          )}

          {user?.isActive && user?.role !== UserType.ADMIN && (
            <li>
              <button
                onClick={() => {
                  router.replace(`/${locale}/user/profile`);
                  setOpens(false);
                }}
              >
                {userTranslation("Profile")}
              </button>
            </li>
          )}

          {!userRoleAdmin && (
            <li onClick={() => setOpenSideMenu(true)}>
              <Link href="">
                {userTranslation("Cart")}({cart.length})
              </Link>
            </li>
          )}

          {!userRoleAdmin && (
            <li onClick={() => setOpenWishListMenu(true)}>
              <Link href="">
                {userTranslation("Wish List")}({wishList.length})
              </Link>
            </li>
          )}
          <li>
            <button
              onClick={() => {
                router.replace(`/${locale}/user/contact`);
                setOpens(false);
              }}
            >
              {userTranslation("Contact Us")}
            </button>
          </li>

          {user?.isActive && (
            <li className="border-2 border-white py-2.5 px-20">
              <button
                onClick={() => {
                  if (user && user?.role === UserType.USER) {
                    cartItems({
                      user: user["_id"],
                      cartItems: cart,
                      wishListItems: wishList,
                    });
                  }

                  cartItems({ user: user["_id"], cartItems: cart });
                  dispatch(logoutUser());
                  localStorage.removeItem("userToken");
                  localStorage.removeItem("user");
                  dispatch(clearCookiesThunk("cartItems"));
                  dispatch(clearCookiesThunk("wishListItems"));
                  router.replace(`/${locale}`);
                  toast.success("Do Not Be Late");
                  setOpens(false);
                }}
              >
                {userTranslation("Log out")}
              </button>
            </li>
          )}

          <li>
            <LanguageSelector />{" "}
          </li>

          <span
            onClick={() => setOpens(false)}
            className="text-6xl absolute top-4 end-4 cursor-pointer"
          >
            &times;
          </span>

          <CartSideMenu
            setOpens={setOpens}
            setOpenSideMenu={setOpenSideMenu}
            openSideMenu={openSideMenu}
          />

          <WishListSideMenu
            setOpens={setOpens}
            openWishListMenu={openWishListMenu}
            setOpenWishListMenu={setOpenWishListMenu}
          />
        </ul>
      )}
    </div>
  );
}

export default LandingPageMenu;
