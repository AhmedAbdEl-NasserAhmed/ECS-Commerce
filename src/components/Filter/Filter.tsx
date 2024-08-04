"use client";

import FilterColorsOptions from "@/ui/FiltersColorOptions/FilterColorsOptions";
import FilterSizesOptions from "@/ui/FilterSizesOptions/FilterSizesOptions";
import RangeSlider from "@/ui/RangeSlider/RangeSlider";
import SubCategoriesFiltertation from "@/ui/SubCategoriesFilteration/SubCategoriesFiltertation";
import { BsFilterLeft } from "react-icons/bs";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CSSProperties, useEffect, useRef, useState } from "react";
import FilterSaleOptions from "../FilterSaleOptions/FilterSaleOptions";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("user");

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [value, setValue] = useState<number[]>([1, 5000]);

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    const params = new URLSearchParams(searchParams);
    params.set("min", String(newValue[0]));
    params.set("max", String(newValue[1]));
    setValue(newValue as number[]);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleFilterChange = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", e.target.value);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleFilterSizeChange = (value) => {
    const params = new URLSearchParams(searchParams);
    if (!value) {
      params.delete("size");
    } else {
      params.set("size", value);
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filterScrollStyles: CSSProperties = {
    position: "fixed",
    width: "23rem",
    top: "0px",
    height: "100vh",
    overflowY: "scroll",
  };

  return (
    <div
      className="flex flex-col bg-[#F5F5F5] shadow-2xl "
      style={{
        ...(props.isScrollPassedFilterEl && filterScrollStyles),
      }}
    >
      <div className="mb-5 mt-3 hidden  md:flex items-center gap-3  ">
        <BsFilterLeft size={"3rem"} />
        <p className="text-[3rem] font-bold ">{t("Filters")}</p>
      </div>

      {props.setShowMobileFilters && (
        <button
          onClick={() => props.setShowMobileFilters(false)}
          className="inline-block md:hidden bg-[#161616] text-white p-8 text-2xl mb-8 sticky top-0 shadow-md z-50 "
        >
          {t("Done")}
        </button>
      )}

      <FilterItemContainer title={t("Colors")}>
        <FilterColorsOptions />
      </FilterItemContainer>

      <FilterItemContainer title={t("Sizes")}>
        <FilterSizesOptions handleFilterChange={handleFilterSizeChange} />
      </FilterItemContainer>

      <FilterItemContainer title={t("Sale")}>
        <FilterSaleOptions />
      </FilterItemContainer>

      <FilterItemContainer title={t("Collections")}>
        <SubCategoriesFiltertation />
      </FilterItemContainer>

      <FilterItemContainer title={t("Price")}>
        <RangeSlider handleChange={handlePriceChange} value={value} />
      </FilterItemContainer>

      <FilterItemContainer title={t("Sort")}>
        <select
          name="sort"
          className="py-2 px-4 rounded-2xl text-lg font-medium bg-white ring-1 ring-gray-400 w-full"
          onChange={handleFilterChange}
        >
          <option value="">{t("Sort By")}</option>
          <option value="price">
            {t("Price")} ({t("low to high")})
          </option>
          <option value="-price">
            {t("Price")} ({t("high to low")})
          </option>
          <option value="-createdAt">{t("Newest")}</option>
          <option value="createdAt">{t("Oldest")}</option>
        </select>
      </FilterItemContainer>
    </div>
  );
};

export default Filter;
