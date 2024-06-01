import { Box } from "@mui/material";
import LinksList from "./LinksList";
import { blogsLinks, otherLinks, productLinks } from "@/constants/menuLinks";

interface Props {
  setShowMenuLinks: (boolean: boolean) => void;
}

function ResponsiveMenuLinks({ setShowMenuLinks }: Props) {
  return (
    <Box
      component="ul"
      className="bg-[#F1F2F7] top-[6.5rem] left-0 z-10 absolute h-[calc(100vh-10vh)] flex flex-col gap-2 text-xl text-gray-500 md:hidden w-full py-0 "
    >
      <LinksList
        onClick={() => setShowMenuLinks(false)}
        header="PRODUCTS"
        links={productLinks}
      />

      <LinksList
        onClick={() => setShowMenuLinks(false)}
        header="BLOGS"
        links={blogsLinks}
      />

      <LinksList
        onClick={() => setShowMenuLinks(false)}
        header="OTHERS"
        links={otherLinks}
      />

      {/* <Box component="li" onClick={() => setShowMenuLinks(false)}>
        <Link
          className="flex items-center px-2 py-4  text-gray-400 hover:bg-gradient-to-r from-mainColor to-cyan-500 hover:text-white   transition-all duration-500 bg-transparent"
          href="/admin/dashboard/product"
        >
          <span>
            <HiOutlinePlusSm />
          </span>
          <span> Product</span>
        </Link>
      </Box>
      <Box component="li" onClick={() => setShowMenuLinks(false)}>
        <Link
          className="flex items-center px-2 py-4  text-gray-400 hover:bg-gradient-to-r from-mainColor to-cyan-500 hover:text-white transition-all duration-500 bg-transparent"
          href="/admin/dashboard/blog"
        >
          <span>
            <HiOutlinePlusSm />
          </span>
          <span> BLog</span>
        </Link>
      </Box> */}
    </Box>
  );
}

export default ResponsiveMenuLinks;
