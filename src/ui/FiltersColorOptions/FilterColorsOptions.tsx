"use client";

import { useGetAllProductsColorsQuery } from "@/lib/features/api/productsApi";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { ChangeEvent, useState } from "react";

function FilterColorsOptions() {
  const { data } = useGetAllProductsColorsQuery("colors");

  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const pathName = usePathname();

  const searchParams = useSearchParams();

  const { replace } = useRouter();

  const handleAddColorToParams = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "" && !selectedColors.includes(e.target.value)) {
      const newSelectedItems = [...selectedColors, e.target.value];
      setSelectedColors(newSelectedItems);

      const params = new URLSearchParams(searchParams);

      const query = newSelectedItems.join(",");

      params.set("colors", query);

      const newUrl = `${pathName}?${params.toString()}`;

      replace(newUrl);
    }
  };

  return (
    <select
      onChange={handleAddColorToParams}
      className="py-2 px-4 rounded-2xl text-lg font-medium bg-[#EBEDED]"
      name="colors"
    >
      <option value="">colors</option>
      {data?.data?.map((color: string) => (
        <option key={color}>{color}</option>
      ))}
    </select>
  );
}

export default FilterColorsOptions;
