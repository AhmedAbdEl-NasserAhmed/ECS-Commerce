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
        console.log("XXXXX product XXXXX", product);
        return (
          <ProductActionItem
            key={product["_id"]}
            content={
              <p className="text-lg font-bold">{product.size.toUpperCase()}</p>
            }
            className={`w-[2.85rem] h-[2.85rem]`}
          />
        );
      })}
    </ul>
  );
}

export default ProductListOptions;
