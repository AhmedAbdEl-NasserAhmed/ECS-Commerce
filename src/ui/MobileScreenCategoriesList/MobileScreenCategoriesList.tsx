"use client";

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
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
      <ul className=" p-8 w-[70vw] bg-white  h-full  flex flex-col items-center  text-center    ">
        <div className="grid grid-cols-2 items-center gap-36 mb-16 w-full ">
          <h2>Category</h2>
          <h2>Collection</h2>
        </div>
        {data?.data.map((category) => (
          <div
            key={category["_id"]}
            className="grid grid-cols-2 gap-36 items-center text-center mb-16 w-full   "
          >
            <li className="px-4 py-2 hover:bg-black hover:text-white duration-100 transition-all">
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

export default MobileScreenCategoriesList;
