import { Box } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { HiMenuAlt3, HiOutlineViewGrid } from "react-icons/hi";
import Accordian from "@/ui/Accordian/Accordian";
import { HiChevronRight, HiOutlineCube } from "react-icons/hi2";
import { usePathname } from "next/navigation";

interface Props {
  expand: boolean;
  setExpand?: (value) => void;
}

function Links({ setExpand, expand }: Props) {
  const params = usePathname();

  console.log("expand", expand);

  return (
    <Box
      onMouseEnter={window.innerWidth > 1020 ? () => setExpand(false) : null}
      component="div"
      className={` ${
        expand ? "w-0 lg:w-[5vw]" : "lg:w-[16vw]"
      }  flex border-2 transition-all duration-500 absolute w-[30rem]  h-full z-50  lg:relative group border-gray-100 bg-[#FFFFFF] flex-col overflow-hidden  `}
    >
      <Box
        component="div"
        className="bg-[#FFFFFF] border-b-2 border-gray-100 p-6 h-[9.8vh] flex justify-center items-center"
      >
        <Link
          href="/"
          className="text-md sm:text-xl md:text-3xl flex gap-5 min-w-[16vw] justify-center items-center font-bold   "
        >
          <Image
            className={`${
              expand ? "translate-x-[5rem]" : "translate-x-0"
            } group-hover:translate-x-0`}
            src="/favicon.png"
            alt="logo "
            width={50}
            height={50}
          />
          <p
            className={` 
              ${expand ? "opacity-0" : "opacity-1"}
              ${expand ? "translate-x-[40rem]" : "translate-x-0"}
                group-hover:block group-hover:opacity-100 group-hover:translate-x-0 text-gray-700 transition-opacity transition-opacity-500 transition-transform-500 ease-in-out`}
          >
            PITE TECH
          </p>
        </Link>
        <span
          className="lg:hidden absolute right-4 top-8 z-50 text-4xl cursor-pointer"
          onClick={() => setExpand((prev) => !prev)}
        >
          <HiMenuAlt3 />
        </span>
      </Box>
      <Box component="div">
        <Link
          href="/"
          className="flex items-center border-b-2 gap-4 border-gray-100 p-8 text-xl font-semibold"
        >
          <span className="text-4xl">
            <HiOutlineViewGrid />
          </span>
          <p
            className={` 
              ${expand ? "opacity-0" : "opacity-1"}
              ${expand ? "translate-x-[40rem]" : "translate-x-0"}
                group-hover:block group-hover:opacity-100 group-hover:translate-x-0 text-gray-700 transition-opacity transition-opacity-500 transition-transform-500 ease-in-out`}
          >
            DASHBOARD
          </p>
        </Link>

        <Accordian.Toggle id="product">
          <Box
            component="div"
            className="flex items-center justify-between text-xl font-semibold"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl ">
                <HiOutlineCube />
              </span>
              <p
                className={` 
              ${expand ? "opacity-0" : "opacity-1"}
              ${expand ? "translate-x-[40rem]" : "translate-x-0"}
                group-hover:block group-hover:opacity-100 group-hover:translate-x-0 text-gray-700 transition-opacity transition-opacity-500 transition-transform-500 ease-in-out`}
              >
                PRODUCTS
              </p>
            </div>

            <span className="text-xl transition-all duration-500">
              <HiChevronRight />
            </span>
          </Box>

          <span
            style={{ opacity: params.includes("product") ? "1" : "0" }}
            className="w-2 h-3/4 transition-opacity duration-500 rounded-2xl absolute bg-[#5b93ff] left-0 top-4"
          ></span>
        </Accordian.Toggle>
        <Accordian.List
          close={expand}
          className="flex flex-col justify-center items-center gap-7 bg-gray-200 rounded-md "
          id="product"
        >
          <li className="p-4 text-xl text-gray-700">
            <Link
              onClick={() => setExpand(true)}
              href="/admin/dashboard/product"
            >
              Add Product
            </Link>
          </li>
          <li className="p-4 text-xl text-gray-700">
            <Link
              onClick={() => setExpand(true)}
              href="/admin/dashboard/productsOverview"
            >
              Products OverView
            </Link>
          </li>
        </Accordian.List>
      </Box>
    </Box>
  );
}

export default Links;
