import { sizesOptions } from "@/constants/sizeOptions";
import { useState } from "react";

function FilterSizesOptions({ handleFilterChange }) {
  const [selectedSize, setSelectedSize] = useState("");
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
      {sizesOptions.map((size) => {
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
    // <select
    //   name="size"
    //   className="py-2 w-full px-4 rounded-2xl text-lg font-medium bg-[#EBEDED]"
    //   onChange={handleFilterChange}
    // >
    //   <option value="">Size</option>
    //   {sizesOptions.map((size) => {
    //     return (
    //       <option key={size.id} value={size.value}>
    //         {size.value}
    //       </option>
    //     );
    //   })}
    // </select>
  );
}

export default FilterSizesOptions;
