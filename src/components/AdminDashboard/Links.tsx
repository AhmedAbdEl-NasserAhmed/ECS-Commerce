import { Box } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

interface Props {
  expand: boolean;
}

function Links({ expand }: Props) {
  return (
    <Box
      component="div"
      className={` ${
        expand ? "w-[5vw]" : "w-[16vw]"
      }  flex border-2 transition-all duration-500 hover:w-[16vw] group border-gray-100 bg-[#FFFFFF] flex-col overflow-hidden  `}
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
          <span
            className={` 
              ${expand ? "opacity-0" : "opacity-1"}
              ${expand ? "translate-x-[40rem]" : "translate-x-0"}
                group-hover:block group-hover:opacity-100 group-hover:translate-x-0 text-gray-700 transition-opacity transition-opacity-500 transition-transform-500 ease-in-out`}
          >
            PITE TECH
          </span>
        </Link>
      </Box>

      {/* <LinksList header="PRODUCTS" links={productLinks} />

      <LinksList header="BLOGS" links={blogsLinks} />

      <LinksList header="OTHERS" links={otherLinks} /> */}
    </Box>
  );
}

export default Links;
