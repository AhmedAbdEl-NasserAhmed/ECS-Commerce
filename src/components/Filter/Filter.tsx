"use client";

import { sizesOptions } from "@/constants/sizeOptions";
import FilterColorsOptions from "@/ui/FiltersColorOptions/FilterColorsOptions";
import RangeSlider from "@/ui/RangeSlider/RangeSlider";
import SubCategoriesFiltertation from "@/ui/SubCategoriesFilteration/SubCategoriesFiltertation";
import Slider from "@mui/material/Slider";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [value, setValue] = useState<number[]>([0, 5000]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    const params = new URLSearchParams(searchParams);
    params.set("min", String(newValue[0]));
    params.set("max", String(newValue[1]));
    setValue(newValue as number[]);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 mb-12 flex justify-between gap-10 lg:gap-0 flex-col md:flex-row ">
      <div className="flex flex-wrap  gap-6 ">
        <FilterColorsOptions />
        <select
          name="size"
          className="py-2 px-4 rounded-2xl text-lg font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
        >
          <option value="">Size</option>
          {sizesOptions.map((size) => {
            return (
              <option key={size.id} value={size.value}>
                {size.value}
              </option>
            );
          })}
        </select>
        <SubCategoriesFiltertation />
        <div className="w-72">
          <RangeSlider handleChange={handleChange} value={value} />
        </div>
      </div>
      <div className="">
        <select
          name="sort"
          id=""
          className="py-2 px-4 rounded-2xl text-lg font-medium bg-white ring-1 ring-gray-400"
          onChange={handleFilterChange}
        >
          <option>Sort By</option>
          <option value="price">Price (low to high)</option>
          <option value="-price">Price (high to low)</option>
          <option value="-createdAt">Newest</option>
          <option value="createdAt">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
