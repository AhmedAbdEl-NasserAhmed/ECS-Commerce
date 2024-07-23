"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { HiEye, HiOutlineHeart } from "react-icons/hi2";
import ProductActionItem from "../ProductCard/ProductActionItem";
import { Layout } from "@/config/layout";

function ProductListOptions({ product }) {
  const router = useRouter();

  const { locale } = useParams();

  return (
    <ul className="absolute top-7 items-center -right-36 group-hover:right-8 group-hover:z-20 transition-all duration-700  flex flex-col gap-5">
      {Layout.featureWishlist && (
        <ProductActionItem content={<HiOutlineHeart />} />
      )}
      <ProductActionItem
        content={<HiEye />}
        onClick={() => router.push(`/${locale}/user/product/${product?.slug}`)}
      />
      <ProductActionItem
        content={
          <p className="text-lg font-bold">
            {product.size.value.toUpperCase()}
          </p>
        }
        className={`w-[2.85rem] h-[2.85rem]`}
      />
    </ul>
  );
}

export default ProductListOptions;
