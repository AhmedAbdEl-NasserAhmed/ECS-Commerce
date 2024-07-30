"use client";

import { useGetAllCategoriesQuery } from "@/lib/features/api/categoriesApi";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

function NavBarCategoriesList({ showCategoriesMenu, data, isLoading }) {
  const { locale } = useParams();

  const { replace } = useRouter();

  if (isLoading) return;

  const handleClick = (id: string) => {
    replace(`/${locale}/user/productsList/${id}`);
  };

  return (
    <ul
      className={` ${
        showCategoriesMenu ? "opacity-100" : "opacity-0"
      } absolute h-auto  bg-white  w-80 shadow-2xl top-10 z-50 start-0 transition-all duration-300 flex flex-col gap-6 overflow-y-scroll `}
    >
      {data?.data.map((category) => (
        <li
          className="px-4 py-2 hover:bg-black hover:text-white transition-all duration-300"
          key={category["_id"]}
        >
          <button onClick={() => handleClick(category["_id"])}>
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default NavBarCategoriesList;
