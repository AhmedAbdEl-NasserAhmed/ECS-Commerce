"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { HiEye, HiOutlineHeart } from "react-icons/hi2";
import ProductActionItem from "../ProductCard/ProductActionItem";
import { Layout } from "@/config/layout";

function ProductListOptions({ product, productsBySlug = [] }) {
  const router = useRouter();

  const { locale } = useParams();

  return (
    <ul className="absolute top-7 items-center -end-36 group-hover:end-8 group-hover:z-20 transition-all duration-700  flex flex-col gap-5">
      {Layout.featureWishlist && (
        <ProductActionItem content={<HiOutlineHeart />} />
      )}
      <ProductActionItem
        content={<HiEye />}
        onClick={() => router.push(`/${locale}/user/product/${product?.slug}`)}
        className="cursor-pointer"
      />
      {productsBySlug?.map((product) => {
        return (
          <ProductActionItem
            key={product.productId}
            content={
              <p className="text-[.9rem] font-bold">
                {product.size.toUpperCase()}
              </p>
            }
            className={`!w-[3rem] !h-[3rem]`}
          />
        );
      })}
    </ul>
  );
}

export default ProductListOptions;
