"use client";

import { useGetAllProductsQuery } from "@/lib/features/api/productsApi";
import Image from "next/image";
import Link from "next/link";
import Spinner from "../Spinner/Spinner";
import { HiOutlineHeart } from "react-icons/hi2";
import ProductListOptions from "./ProductListOptions";

function ProductList() {
  const { data, isLoading } = useGetAllProductsQuery("products");

  if (isLoading) return <Spinner />;

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {data?.data?.slice(0, 4).map((product) => {
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
              <ProductListOptions className="absolute  top-4 -right-36 group-hover:right-8  group-hover:z-20 transition-all duration-700  flex flex-col gap-7" />
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
            <button className="border-2 bg-[#ed0534]  text-white  rounded-2xl w-max px-6 py-4 text-md hover:bg-lama hover:text-white">
              Add to Cart
            </button>
          </div>
        );
      })}

      {/* <Link
        href="/text"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-80">
          <Image
            src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            fill
            sizes="25vw"
            alt="image"
            className="absolute z-10 hover:opacity-0 easy transition-opacity duration-500 object-cover rounded-md"
          />
          <Image
            src="
          https://images.unsplash.com/photo-1716292791850-1e97d89e440b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8
          "
            fill
            sizes="25vw"
            alt="image"
            className="absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Product Name</span>
          <span className="font-bold">$45</span>
        </div>
        <div className="text-sm  text-gray-500">Description</div>
        <button className="border-2  ring-1 ring-lama text-lama rounded-2xl w-max px-4 py-2 text-xs hover:bg-lama hover:text-white">
          Add to Cart
        </button>
      </Link>
      <Link
        href="/text"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-80">
          <Image
            src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            fill
            sizes="25vw"
            alt="image"
            className="absolute z-10 hover:opacity-0 easy transition-opacity duration-500 object-cover rounded-md"
          />
          <Image
            src="
          https://images.unsplash.com/photo-1716292791850-1e97d89e440b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8
          "
            fill
            sizes="25vw"
            alt="image"
            className="absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Product Name</span>
          <span className="font-bold">$45</span>
        </div>
        <div className="text-sm  text-gray-500">Description</div>
        <button className="border-2  ring-1 ring-lama text-lama rounded-2xl w-max px-4 py-2 text-xs hover:bg-lama hover:text-white">
          Add to Cart
        </button>
      </Link>

      <Link
        href="/text"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-80">
          <Image
            src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            fill
            sizes="25vw"
            alt="image"
            className="absolute z-10 hover:opacity-0 easy transition-opacity duration-500 object-cover rounded-md"
          />
          <Image
            src="
          https://images.unsplash.com/photo-1716292791850-1e97d89e440b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8
          "
            fill
            sizes="25vw"
            alt="image"
            className="absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Product Name</span>
          <span className="font-bold">$45</span>
        </div>
        <div className="text-sm  text-gray-500">Description</div>
        <button className="border-2  ring-1 ring-lama text-lama rounded-2xl w-max px-4 py-2 text-xs hover:bg-lama hover:text-white">
          Add to Cart
        </button>
      </Link> */}
    </div>
  );
}

export default ProductList;
