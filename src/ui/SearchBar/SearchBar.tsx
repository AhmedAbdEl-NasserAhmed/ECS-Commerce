"use client";

import useDebounceHook from "@/hooks/useDebounceHook";
import { useGetProductByNameQuery } from "@/lib/features/api/productsApi";
import Image from "next/image";
import { useState } from "react";
import ProductsList from "./ProductsList";

function SearchBar() {
  const [productName, setProductName] = useState<string>("");

  const debounceValue = useDebounceHook(productName);

  const { data, isLoading } = useGetProductByNameQuery(debounceValue);

  return (
    <div className="relative flex text-xl items-center justify-between gap-4 bg-gray-100 p-4 rounded-md grow">
      <input
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        name="name"
        className="grow bg-transparent outline-none"
        placeholder="Search"
      />
      <button className="cursor-pointer">
        <Image src="/search.png" width={16} height={16} alt="Search-logo" />
      </button>
      <ProductsList setProductName={setProductName} data={data} />
    </div>
  );
}

export default SearchBar;
