"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import CollectionList from "./CollectionList";
import useClickOutside from "@/hooks/useClickOutside";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

function NavBarCategoriesList({ data, isLoading }) {
  const { locale } = useParams();

  const [showCategoriesMenu, setShowCategoriesMenu] = useState<boolean>(false);

  const { replace } = useRouter();

  const handleClick = (id: string) => {
    replace(`/${locale}/user/productsList/${id}`);
  };

  const ref = useClickOutside({ close: setShowCategoriesMenu, value: false });

  const t = useTranslations("user");

  if (isLoading) return;

  return (
    <div
      ref={ref}
      className=" cursor-pointer"
      onClick={() => setShowCategoriesMenu((prev) => !prev)}
    >
      <div className="flex items-center gap-1">
        <h2>{t("Shop")}</h2>
        <span>{showCategoriesMenu ? <HiChevronUp /> : <HiChevronDown />} </span>
      </div>
      <li
        className={` ${
          showCategoriesMenu ? "h-[38rem]" : "h-0"
        } absolute  w-screen bg-[#f1e5cd] cursor-default  text-[1.6rem]  shadow-2xl top-32 z-10  -start-5 transition-all duration-300 flex flex-col items-center gap-6 text-center overflow-hidden overflow-y-scroll text-[#333] `}
      >
        <div className=" pb-8  w-3/4 m-auto h-full flex flex-col items-center overflow-y-scroll">
          <div className="sticky top-0 z-40 bg-[#f1e5cd]  p-4 grid grid-cols-2 items-center mb-10 w-1/2">
            <h2 className="font-bold uppercase tracking-widest">
              {t("Categories")}
            </h2>
            <h2 className="font-bold uppercase tracking-widest">
              {t("Collections")}
            </h2>
          </div>

          {data?.data.map((category) => (
            <ul
              key={category["_id"]}
              className="grid grid-cols-2 items-center justify-center   w-1/2 h-full"
            >
              <li className="px-4 py-2 group duration-100 transition-all self-start font-medium">
                <button onClick={() => handleClick(category["_id"])}>
                  <div className="font-medium">
                    {category.name?.[locale as string]}
                  </div>
                  <div className="w-0 group-hover:w-full h-px bg-black duration-100 transition-all"></div>
                </button>
              </li>

              <CollectionList id={category["_id"]} />
              <hr className="my-[5rem] border-[#fef2db] col-span-full" />
            </ul>
          ))}
        </div>
      </li>
    </div>
  );
}

export default NavBarCategoriesList;
