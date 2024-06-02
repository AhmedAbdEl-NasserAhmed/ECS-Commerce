import { Box } from "@mui/material";
import LinksList from "./LinksList";
import { blogsLinks, otherLinks, productLinks } from "@/constants/menuLinks";

interface Props {
  showMenuLinks: boolean;
  setShowMenuLinks: (boolean: boolean) => void;
}

function ResponsiveMenuLinks({ showMenuLinks, setShowMenuLinks }: Props) {
  return (
    <Box
      component="ul"
      style={{ transform: `translateX(-${showMenuLinks ? "0" : "100"}rem)` }}
      className={`bg-[#F1F2F7] top-[6.5rem] left-0 z-10 absolute  h-[calc(100vh-10vh)] flex flex-col transition-all duration-500 ease-in-out gap-2 text-xl text-gray-500 md:hidden w-full py-0  `}
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
    </Box>
  );
}

export default ResponsiveMenuLinks;
