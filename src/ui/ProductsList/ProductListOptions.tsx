"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { HiEye, HiOutlineHeart } from "react-icons/hi2";

function ProductListOptions({ product, className }) {
  const router = useRouter();

  const { locale } = useParams();

  return (
    <ul className={className}>
      <li
        onClick={() => router.push(`/${locale}/product/${product?.slug}`)}
        className="flex items-center gap-7 group overflow-hidden "
      >
        <span className="text-2xl hover:bg-[#ed0534] transition-all duration-300 hover:text-white bg-white flex items-center justify-center w-11  h-11 rounded-full ">
          <HiEye />
        </span>
      </li>
      <li className="flex items-center gap-7 ">
        <span className="text-2xl bg-white hover:bg-[#ed0534] transition-all duration-300 hover:text-white flex items-center justify-center w-11 h-11 rounded-full">
          <HiOutlineHeart />
        </span>
      </li>
    </ul>
  );
}

export default ProductListOptions;
