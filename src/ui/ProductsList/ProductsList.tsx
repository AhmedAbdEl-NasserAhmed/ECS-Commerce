"use client";

import { useGetAllProductsQuery } from "@/lib/features/api/productsApi";
import Image from "next/image";
import Link from "next/link";
import Spinner from "../Spinner/Spinner";
import { HiOutlineHeart } from "react-icons/hi2";
import ProductListOptions from "./ProductListOptions";
import { getUniqueValues } from "@/lib/helpers";

function ProductList() {
  const { data, isLoading } = useGetAllProductsQuery("products");

  const uniqueItems = getUniqueValues(data?.data, "name");

  if (isLoading) return <Spinner />;

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {uniqueItems?.map((product) => {
        return (
          <div
            key={product["_id"]}
            className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          >
            <div className="relative w-full h-96 cursor-pointer group overflow-hidden">
              <Image
                src={product?.images[0]?.url}
                fill
                sizes="25vw"
                alt="image"
                className={`absolute z-10  ${
                  product?.images[1] ? "hover:opacity-0" : ""
                }  easy transition-opacity duration-500 object-cover rounded-md `}
              />
              <ProductListOptions
                product={product}
                className="absolute  top-4 -right-36 group-hover:right-8  group-hover:z-20 transition-all duration-700  flex flex-col gap-7"
              />
              {product?.images[1] && (
                <Image
                  src={product?.images[1]?.url}
                  fill
                  sizes="25vw"
                  alt="image"
                  className="absolute object-cover rounded-md "
                />
              )}
            </div>
            <div className="flex justify-between items-center text-xl font-semibold">
              <span className="font-semibold">{product?.name}</span>
              <div className="flex items-center gap-6">
                <span className="font-bold line-through text-gray-300">
                  EGP {""}
                  {product?.price}
                </span>
                <span className="font-bold">
                  EGP {""}
                  {product?.productSalePrice}
                </span>
              </div>
            </div>
            <h2 className="text-xl text-ellipsis overflow-hidden whitespace-nowrap">
              {product?.description}
            </h2>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
