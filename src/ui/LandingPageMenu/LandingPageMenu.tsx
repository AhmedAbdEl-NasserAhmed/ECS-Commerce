"use client";

import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import MobileScreenCategoriesList from "../MobileScreenCategoriesList/MobileScreenCategoriesList";
import { UserType } from "@/types/enums";

import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { useGetAllCategoriesQuery } from "@/lib/features/api/categoriesApi";
import { useTranslations } from "next-intl";
import useLogout from "@/hooks/useLogout";

function LandingPageMenu() {
  const [opens, setOpens] = useState<boolean>(false);

  const { locale } = useParams();

  const router = useRouter();

  const [openCategoriesMenu, setOpenCategoriesMenu] = useState<boolean>(false);

  const { data, isLoading } = useGetAllCategoriesQuery("categories");

  const user = useAppSelector((state) => state.usersSlice.user);

  const userTranslation = useTranslations("user");

  const logout = useLogout();

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
                <span>{userTranslation("Dashboard")}</span>
              </Link>
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
                  logout();
                  router.replace(`/${locale}`);
                  toast.success(userTranslation("See you soon"));
                  setOpens(false);
                }}
              >
                {userTranslation("Log out")}
              </button>
            </li>
          )}

          <span
            onClick={() => setOpens(false)}
            className="text-6xl absolute top-4 end-4 cursor-pointer"
          >
            &times;
          </span>
        </ul>
      )}
    </div>
  );
}

export default LandingPageMenu;
