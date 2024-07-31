"use client";

import { useGetAllProductsColorsQuery } from "@/lib/features/api/productsApi";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { ChangeEvent, useEffect, useState } from "react";
import ColorItem from "../ColorItem/ColorItem";

function FilterColorsOptions() {
  const [filtredColors, setFiltredColors] = useState<string[]>([]);

  const { data } = useGetAllProductsColorsQuery("colors");

  const searchParams = useSearchParams();

  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const pathName = usePathname();

  const { replace } = useRouter();

  const selectedColorsUrl = searchParams.get("colors");

  useEffect(() => {
    if (selectedColorsUrl !== "") {
      setFiltredColors(selectedColorsUrl?.split(","));
    }
  }, [selectedColorsUrl]);

  useEffect(() => {
    if (filtredColors?.length > 0) {
      setSelectedColors(filtredColors);
    }
  }, [filtredColors]);

  const isColorActive = (color) => selectedColors.includes(color);

  const updateUrl = () => {
    const newSelectedItems = [...selectedColors];

    console.log("selectedColors", selectedColors);

    const params = new URLSearchParams(searchParams);

    const query = newSelectedItems.join(",");
    if (!selectedColors) {
      params.delete("colors");
    } else {
      params.set("colors", query);
    }

    const newUrl = `${pathName}?${params.toString()}`;

    replace(newUrl);

    return newSelectedItems;
  };

  const handleAddColorToParams = (color) => {
    if (color !== "" && !isColorActive(color)) {
      setSelectedColors((data) => [...data, color]);
    } else {
      setSelectedColors((s) => s.filter((c) => c !== color));
    }
  };

  useEffect(() => {
    updateUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColors]);

  return (
    <div className="flex gap-8 flex-wrap justify-center">
      {data?.data?.map((color) => {
        return (
          <div
            key={color}
            onClick={handleAddColorToParams.bind(null, color)}
            className={`rounded-full cursor-pointer w-[2.3rem] h-[2.3rem] ${
              isColorActive(color) ? "ring-offset-2 ring-2 ring-slate-400" : ""
            }`}
            style={{
              background: color,
            }}
          ></div>
        );
      })}
      <div
        onClick={() => setSelectedColors([])}
        className={`relative rounded-full cursor-pointer w-[2.3rem] h-[2.3rem] border-2`}
      >
        <span
          className="absolute w-full h-1 top-1/2 left-1/2"
          style={{
            background: "#f99797",
            transform: "translate(-50%, -50%) rotate(-45deg)",
          }}
        ></span>
      </div>
    </div>
  );
}

export default FilterColorsOptions;
