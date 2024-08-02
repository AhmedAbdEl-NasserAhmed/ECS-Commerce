"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetAllCategoriesQuery } from "@/lib/features/api/categoriesApi";
import CollectionList from "../NavBarCaegoriesList/CollectionList";
import useClickOutside from "@/hooks/useClickOutside";

function MobileScreenCategoriesList({
  setOpenCategoriesMenu,
  openCategoriesMenu,
}) {
  const { locale } = useParams();

  const { replace } = useRouter();

  const { data, isLoading } = useGetAllCategoriesQuery("categories");

  const handleClick = (id: string) => {
    replace(`/${locale}/user/productsList/${id}`);
  };

  const ref = useClickOutside({ close: setOpenCategoriesMenu, value: false });

  if (isLoading) return;

  return (
    <div
      ref={ref}
      className={`fixed top-0 ${
        openCategoriesMenu ? "start-0" : "-start-[900px]"
      } transition-all  duration-300 w-full  h-screen  backdrop-filter backdrop-blur-sm z-50 text-black  text-center text-[1.6rem] font-semibold `}
    >
      <ul className=" p-8 w-[70vw]  h-full  flex flex-col items-center  text-center  bg-[#f1e5cd] text-[#333]">
        <div className="grid grid-cols-2 items-center gap-36 mb-16 w-full ">
          <h2 className="font-bold uppercase tracking-widest">Category</h2>
          <h2 className="font-bold uppercase tracking-widest">Collection</h2>
        </div>
        {data?.data.map((category) => (
          <div
            key={category["_id"]}
            className="grid grid-cols-2 gap-y-5 gap-x-36 items-center text-center  w-full"
          >
            <li className="px-4 py-2 group duration-100 transition-all self-start font-medium">
              <button onClick={() => handleClick(category["_id"])}>
                <div>{category.name}</div>
                <div className="w-0 group-hover:w-full h-px bg-black duration-100 transition-all"></div>
              </button>
            </li>

            <CollectionList id={category["_id"]} />
            <hr className="my-[5rem] border-[#fef2db] col-span-full" />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default MobileScreenCategoriesList;
