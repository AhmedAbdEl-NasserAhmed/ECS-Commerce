import { sizesOptions } from "@/constants/sizeOptions";

function FilterSizesOptions({ handleFilterChange }) {
  return (
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
  );
}

export default FilterSizesOptions;
