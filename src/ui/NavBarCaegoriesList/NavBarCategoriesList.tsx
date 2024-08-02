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

  // f1e5cd;

  return (
    <div
      ref={ref}
      className={` ${
        showCategoriesMenu ? "opacity-100" : "opacity-0"
      } absolute  w-screen p-8  bg-[#161616] text-white h-auto shadow-2xl top-16 z-50 -start-48 transition-all duration-300 flex flex-col items-center gap-6 overflow-y-scroll text-center `}
    >
      <ul className=" w-3/4 m-auto  flex flex-col items-center  ">
        <div className="grid grid-cols-2 items-center mb-10 w-1/2">
          <h2>Category</h2>
          <h2>Collection</h2>
        </div>
        {data?.data.map((category) => (
          <div
            key={category["_id"]}
            className="grid grid-cols-2 items-center justify-center  mb-16 w-1/2"
          >
            <li className="px-4 py-2 self-center ">
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
