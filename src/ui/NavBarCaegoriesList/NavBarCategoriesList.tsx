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
      } absolute  w-screen bg-[#161616] text-white text-[1.6rem]  shadow-2xl top-32 z-10  -start-5 transition-all duration-300 flex flex-col items-center gap-6 text-center overflow-hidden overflow-y-scroll  `}
    >
      <ul className=" p-8  w-3/4 m-auto h-full flex flex-col items-center     ">
        <div className="grid grid-cols-2 items-center mb-10 w-1/2">
          <h2>Category</h2>
          <h2>Collection</h2>
        </div>
        {data?.data.map((category) => (
          <div
            key={category["_id"]}
            className="grid grid-cols-2 items-center justify-center  mb-16 w-1/2 h-full"
          >
            <li className="px-4 py-2 self-center hover:bg-white hover:text-black duration-100 transition-all ">
              <button onClick={() => handleClick(category["_id"])}>
                {category.name}
              </button>
            </li>

            <CollectionList id={category["_id"]} />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default NavBarCategoriesList;
