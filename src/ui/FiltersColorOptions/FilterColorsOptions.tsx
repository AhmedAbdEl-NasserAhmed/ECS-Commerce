"use client";

import { useGetAllProductsColorsQuery } from "@/lib/features/api/productsApi";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { ChangeEvent, useEffect, useState } from "react";
import ColorItem from "../ColorItem/ColorItem";

function FilterColorsOptions() {
  const { data } = useGetAllProductsColorsQuery("colors");

  const searchParams = useSearchParams();

  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const pathName = usePathname();

  const { replace } = useRouter();

  const isColorActive = (color) => selectedColors.includes(color);

  const updateUrl = (color) => {
    const newSelectedItems = [...selectedColors, color];

    const params = new URLSearchParams(searchParams);

    const query = newSelectedItems.join(",");

    params.set("colors", query);

    const newUrl = `${pathName}?${params.toString()}`;

    replace(newUrl);

    return newSelectedItems;
  };

  const handleAddColorToParams = (color) => {
    if (color !== "" && !isColorActive(color)) {
      setSelectedColors((s) => s.concat(color));
    } else {
      setSelectedColors((s) => s.filter((c) => c !== color));
    }
  };

  useEffect(() => {
    updateUrl(selectedColors);
  }, [selectedColors]);

  return (
    <div className="flex gap-8 flex-wrap justify-center">
      {data?.data?.map((color) => {
        return (
          <div
            key={color}
            onClick={handleAddColorToParams.bind(null, color)}
            className={`rounded-full cursor-pointer w-[2.3rem] h-[2.3rem] `}
            style={{
              background: color,
              outline: isColorActive(color) ? "1px solid #ed0534" : "",
              outlineOffset: isColorActive(color) ? "2px" : "",
            }}
          ></div>
        );
      })}
    </div>
  );
}

export default FilterColorsOptions;
