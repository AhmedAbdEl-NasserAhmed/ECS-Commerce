import { Box } from "@mui/material";
import Link from "next/link";
import LinksList from "./LinksList";
import { blogsLinks, otherLinks, productLinks } from "@/constants/menuLinks";

function Links() {
  return (
    <Box
      component="div"
      className=" row-span-full hidden bg-[#F1F2F7] md:flex flex-col "
    >
      <Box
        component="div"
        className="hidden bg-[#F1F2F7] border-b-2 border-gray-200 h-[10vh] md:flex justify-center items-center  "
      >
        <Link
          href="/"
          className=" text-md sm:text-xl md:text-3xl justify-center items-center font-bold text-cyan-400  "
        >
          PETI TECH
        </Link>
      </Box>

      <LinksList header="PRODUCTS" links={productLinks} />

      <LinksList header="BLOGS" links={blogsLinks} />

      <LinksList header="OTHERS" links={otherLinks} />
    </Box>
  );
}

export default Links;
