"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { HiEye, HiOutlineHeart } from "react-icons/hi2";
import ProductActionItem from "../ProductCard/ProductActionItem";

function ProductListOptions({ product }) {
  const router = useRouter();

  const { locale } = useParams();

  return (
    <ul className="absolute top-7 -right-36 group-hover:right-8 group-hover:z-20 transition-all duration-700  flex flex-col gap-7">
      <ProductActionItem icon={<HiOutlineHeart />} />{" "}
      <ProductActionItem
        icon={<HiEye />}
        onClick={() => router.push(`/${locale}/user/product/${product?.slug}`)}
      />
    </ul>
  );
}

export default ProductListOptions;
