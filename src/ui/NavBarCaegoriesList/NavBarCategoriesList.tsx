"use client";

import { useGetAllCategoriesQuery } from "@/lib/features/api/categoriesApi";
import { handleLink } from "@/lib/helpers";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

function NavBarCategoriesList({ showCategoriesMenu }) {
  const { locale } = useParams();

  //   const pathName = usePathname();

  const { replace } = useRouter();

  const { data, isLoading } = useGetAllCategoriesQuery("categories");

  if (isLoading) return;

  const handleClick = (id: string) => {
    replace(`${locale}/user/productsList/${id}`, { scroll: false });
  };

  return (
    <ul
      className={` ${
        showCategoriesMenu ? "opacity-100" : "opacity-0"
      } absolute h-auto  bg-white p-5 w-80 shadow-2xl top-10 z-50 left-0 transition-all duration-300 flex flex-col gap-6 overflow-y-scroll `}
    >
      {data?.data.map((category) => (
        <li key={category["_id"]}>
          <button onClick={() => handleClick(category["_id"])}>
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default NavBarCategoriesList;
