"use client";

import { useGetAllSubCategoriesQuery } from "@/lib/features/api/subCategoriesApi";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { ChangeEvent, useState } from "react";

function SubCategoriesFiltertation() {
  const { data } = useGetAllSubCategoriesQuery("sucCategories");

  const pathName = usePathname();

  const searchParams = useSearchParams();

  const { replace } = useRouter();

  const [subCategories, setSubCategories] = useState<string[]>([]);

  function handleAddSubCategoriesToParams(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.value !== "" && !subCategories.includes(e.target.value)) {
      const selectedSubCategories = [...subCategories, e.target.value];

      setSubCategories(selectedSubCategories);

      const params = new URLSearchParams(searchParams);

      const query = selectedSubCategories.join(",");

      params.set("subCategory", query);

      replace(`${pathName}?${params.toString()}`);
    } else {
      setSubCategories([]);
      const params = new URLSearchParams(searchParams);
      params.set("subCategory", "");
      replace(`${pathName}?${params.toString()}`);
    }
  }

  return (
    <select
      onChange={handleAddSubCategoriesToParams}
      className="py-2 px-4 rounded-2xl text-lg font-medium bg-[#EBEDED]"
      name="subCategory"
    >
      <option value="">Sub Categories</option>
      {data?.data?.map((subCategory) => (
        <option value={subCategory["_id"]} key={subCategory["_id"]}>
          {subCategory.name}
        </option>
      ))}
    </select>
  );
}

export default SubCategoriesFiltertation;
