"use client";

import { useGetAllProductsQuery } from "@/lib/features/api/productsApi";
import Spinner from "../Spinner/Spinner";

import { getUniqueValues } from "@/lib/helpers";
import ProductCard from "../ProductCard/ProductCard";

function ProductList() {
  const { data, isLoading } = useGetAllProductsQuery("products");

  const uniqueItems = getUniqueValues(data?.data, "name");

  if (isLoading) return <Spinner />;

  return (
    <div className="mt-12 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2.4rem]">
      {uniqueItems?.map((product) => {
        return <ProductCard key={product["_id"]} product={product} />;
      })}
    </div>
  );
}

export default ProductList;
