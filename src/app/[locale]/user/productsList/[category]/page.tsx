"use client";

import Filter from "@/components/Filter/Filter";
import TitledProductList from "@/components/TitledProductList/TitledProductList";
import {
  useGetAllProductsColorsQuery,
  useGetAllProductsQuery,
} from "@/lib/features/api/productsApi";
import BaseContainer from "@/ui/Container/BaseContainer";

import Spinner from "@/ui/Spinner/Spinner";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

function ProductsByCategory() {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const minPrice = searchParams.get("min");
  const size = searchParams.get("size");
  const maxPrice = searchParams.get("max");
  const colors = searchParams.get("colors");
  const subCategory = searchParams.get("subCategory");

  const { data, isFetching } = useGetAllProductsQuery({
    categoryId: "66885ced811b33a15a63271d",
    min: minPrice || undefined,
    max: maxPrice || undefined,
    size: size || undefined,
    colors: colors || undefined,
    subCategory: subCategory || undefined,
    page: 1,
  });

  return (
    <BaseContainer className="py-0">
      <div className="bg-white w-full sticky top-0 z-50 p-2">
        <Filter />
      </div>
      {isFetching ? (
        <Spinner />
      ) : (
        <TitledProductList
          baseContainerClass="py-0"
          products={data?.data}
          isLoading={isFetching}
        />
      )}
    </BaseContainer>
  );
}

export default ProductsByCategory;
