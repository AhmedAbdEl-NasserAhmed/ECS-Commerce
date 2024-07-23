"use client";

import FilterColorsOptions from "@/ui/FiltersColorOptions/FilterColorsOptions";
import FilterSizesOptions from "@/ui/FilterSizesOptions/FilterSizesOptions";
import RangeSlider from "@/ui/RangeSlider/RangeSlider";
import SubCategoriesFiltertation from "@/ui/SubCategoriesFilteration/SubCategoriesFiltertation";
import { BsFilterLeft } from "react-icons/bs";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CSSProperties, useEffect, useRef, useState } from "react";

function FilterItemContainer(props) {
  return (
    <div className="my-4">
      {props.title && (
        <div className="px-4 text-[1.7rem] font-medium mt-[.2rem] mb-[.5rem]">
          {props.title}
        </div>
      )}
      <div className="bg-white py-6 px-4 ">
        <div>{props.children}</div>
      </div>
    </div>
  );
}

const Filter = (props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [value, setValue] = useState<number[]>([1, 5000]);

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    const params = new URLSearchParams(searchParams);
    params.set("min", String(newValue[0]));
    params.set("max", String(newValue[1]));
    setValue(newValue as number[]);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleFilterChange = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set("size", value);
    replace(`${pathname}?${params.toString()}`);
  };

  const filterScrollStyles: CSSProperties = {
    position: "fixed",
    width: "30rem",
    top: "0px",
    height: "100vh",
    overflowY: "scroll",
  };

  return (
    <div
      className="shadow-md flex flex-col bg-[#F5F5F5]"
      style={{
        ...(props.isScrollPassedFilterEl && filterScrollStyles),
      }}
    >
      <div className="mb-5 mt-3 flex items-center gap-3">
        <BsFilterLeft size={"3rem"} />
        <p className="text-[3rem] font-bold ">Filters</p>
      </div>
      <FilterItemContainer title="Colors">
        <FilterColorsOptions />
      </FilterItemContainer>

      <FilterItemContainer title="Sizes">
        <FilterSizesOptions handleFilterChange={handleFilterChange} />
      </FilterItemContainer>

      <FilterItemContainer title="Sub-categories">
        <SubCategoriesFiltertation />
      </FilterItemContainer>

      <FilterItemContainer title="Price">
        <RangeSlider handleChange={handlePriceChange} value={value} />
      </FilterItemContainer>

      <FilterItemContainer title="Sort">
        <select
          name="sort"
          className="py-2 px-4 rounded-2xl text-lg font-medium bg-white ring-1 ring-gray-400 w-full"
          onChange={handleFilterChange}
        >
          <option value="">Sort By</option>
          <option value="price">Price (low to high)</option>
          <option value="-price">Price (high to low)</option>
          <option value="-createdAt">Newest</option>
          <option value="createdAt">Oldest</option>
        </select>
      </FilterItemContainer>
    </div>
  );
};

export default Filter;
