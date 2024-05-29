import Link from "next/link";
import { HiOutlinePlusSm } from "react-icons/hi";

interface Props {
  setShowMenuLinks: (boolean: boolean) => void;
}

function ResponsiveMenuLinks({ setShowMenuLinks }: Props) {
  return (
    <ul className="bg-white top-[4.2rem] left-0 z-10 absolute h-[calc(100vh-48px)] flex flex-col content-center gap-[2rem] text-xl text-gray-500 md:hidden w-full ">
      <li onClick={() => setShowMenuLinks(false)}>
        <Link
          className="flex items-center px-2 py-4 rounded-md text-gray-400 hover:bg-gradient-to-r from-mainColor to-cyan-500 hover:text-white   transition-all duration-500 bg-transparent"
          href="/admin/dashboard/product"
        >
          <span>
            <HiOutlinePlusSm />
          </span>
          <span> Product</span>
        </Link>
      </li>
      <li onClick={() => setShowMenuLinks(false)}>
        <Link
          className="flex items-center px-2 py-4 rounded-md text-gray-400 hover:bg-gradient-to-r from-mainColor to-cyan-500 hover:text-white transition-all duration-500 bg-transparent"
          href="/admin/dashboard/blog"
        >
          <span>
            <HiOutlinePlusSm />
          </span>
          <span> BLog</span>
        </Link>
      </li>
    </ul>
  );
}

export default ResponsiveMenuLinks;
