import { sizes } from "@/lib/StaticLookups";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

function FilterSizesOptions({ handleFilterChange }) {
  const params = useSearchParams();

  const defaultValue = params.get("size");

  const [selectedSize, setSelectedSize] = useState(defaultValue || "");
  const onSelectSizeHandler = (size) => {
    let _size = size;
    if (size === selectedSize) {
      _size = "";
    }
    handleFilterChange(_size);
    setSelectedSize(_size);
  };
  return (
    <div className="flex gap-4 flex-wrap">
      {sizes.map((size) => {
        return (
          <div
            key={size.id}
            className="cursor-pointer w-[4rem] py-5 bg-white text-center rounded-lg text-[#161616] uppercase font-semibold "
            style={{
              background: selectedSize === size.value ? "#161616" : "",
              color: selectedSize === size.value ? "white" : "",
              outline: "1px solid #161616",
            }}
            onClick={() => {
              onSelectSizeHandler(size.value);
            }}
          >
            {size.value}
          </div>
        );
      })}
    </div>
  );
}

export default FilterSizesOptions;
