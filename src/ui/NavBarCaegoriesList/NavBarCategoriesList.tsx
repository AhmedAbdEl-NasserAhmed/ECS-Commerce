"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import CollectionList from "./CollectionList";
import useClickOutside from "@/hooks/useClickOutside";

function NavBarCategoriesList({
  setShowCategoriesMenu,
  showCategoriesMenu,
  data,
  isLoading,
}) {
  const { locale } = useParams();

  const { replace } = useRouter();

  const handleClick = (id: string) => {
    replace(`/${locale}/user/productsList/${id}`);
  };

  const ref = useClickOutside({ close: setShowCategoriesMenu, value: false });

  if (isLoading) return;

  return (
    <div
      ref={ref}
      className={` ${
        showCategoriesMenu ? "h-[38rem]" : "h-0"
      } absolute  w-screen bg-[#f1e5cd] text-white text-[1.6rem]  shadow-2xl top-32 z-10  -start-5 transition-all duration-300 flex flex-col items-center gap-6 text-center overflow-hidden overflow-y-scroll text-[#333]`}
    >
      <ul className=" p-8  w-3/4 m-auto h-full flex flex-col items-center">
        <div className="grid grid-cols-2 items-center mb-10 w-1/2">
          <h2 className="font-bold uppercase tracking-widest">Category</h2>
          <h2 className="font-bold uppercase tracking-widest">Collection</h2>
        </div>
        {data?.data.map((category) => (
          <div
            key={category["_id"]}
            className="grid grid-cols-2 items-center justify-center   w-1/2 h-full"
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

export default NavBarCategoriesList;
