"use client";

import FilterColorsOptions from "@/ui/FiltersColorOptions/FilterColorsOptions";
import FilterSizesOptions from "@/ui/FilterSizesOptions/FilterSizesOptions";
import RangeSlider from "@/ui/RangeSlider/RangeSlider";
import SubCategoriesFiltertation from "@/ui/SubCategoriesFilteration/SubCategoriesFiltertation";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [value, setValue] = useState<number[]>([1, 5000]);

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
    <div className="mt-12 mb-12 flex justify-between gap-10 md:items-center lg:gap-0 flex-col md:flex-row  ">
      <div className="flex  md:items-center flex-col md:flex-row gap-8 md:gap-6 ">
        <FilterColorsOptions />
        <FilterSizesOptions handleFilterChange={handleFilterChange} />
        <SubCategoriesFiltertation />
        <div className="w-[90%] md:w-72 m-auto">
          <RangeSlider handleChange={handleChange} value={value} />
        </div>
      </div>
      <div className="">
        <select
          name="sort"
          className="py-2 px-4 rounded-2xl text-lg font-medium bg-white ring-1 ring-gray-400 w-full"
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
