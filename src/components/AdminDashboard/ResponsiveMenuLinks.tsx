import Link from "next/link";
import { HiOutlinePlusSm } from "react-icons/hi";

function ResponsiveMenuLinks() {
  return (
    <ul className="bg-white z-10 absolute h-[calc(100vh-8vh)] flex flex-col content-center gap-[2.4rem]  text-gray-500 ">
      <li>
        <Link
          className="flex items-center px-2 py-4 rounded-md text-gray-400 hover:bg-gradient-to-r from-mainColor to-cyan-500 hover:text-white  transition-all duration-500 bg-transparent"
          href="/admin/dashboard/product"
        >
          <span>
            <HiOutlinePlusSm />
          </span>
          <span> Product</span>
        </Link>
      </li>
      <li>
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
