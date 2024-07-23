"use client";

import { useGetAllSubCategoriesQuery } from "@/lib/features/api/subCategoriesApi";
import {
  usePathname,
  useSearchParams,
  useRouter,
  useParams,
} from "next/navigation";

import { ChangeEvent, useEffect, useState } from "react";

function SubCategoriesFiltertation() {
  const { data } = useGetAllSubCategoriesQuery("sucCategories");

  const pathName = usePathname();

  const params = useParams();

  const searchParams = useSearchParams();

  const { replace } = useRouter();

  const [subCategories, setSubCategories] = useState<string[]>([]);

  const isActiveSubCategory = (subCategory) =>
    subCategories.includes(subCategory);

  const updateUrl = (subCategory) => {
    const newSelectedItems = [...subCategories, subCategory];

    const params = new URLSearchParams(searchParams);

    const query = newSelectedItems.join(",");

    params.set("subCategory", query);

    const newUrl = `${pathName}?${params.toString()}`;

    replace(newUrl);

    return newSelectedItems;
  };

  const handleAddSubCategoryToParams = (subCategory) => {
    if (subCategory !== "" && !isActiveSubCategory(subCategory)) {
      setSubCategories((s) => s.concat(subCategory));
    } else {
      setSubCategories((s) => s.filter((c) => c !== subCategory));
    }
  };

  useEffect(() => {
    updateUrl(subCategories);
  }, [subCategories]);

  return (
    <div className="flex gap-[1.3rem] flex-wrap justify-center">
      {data?.data?.map((subCategory) => {
        return (
          <div
            key={subCategory["_id"]}
            className="cursor-pointer px-3 py-5 bg-white text-center rounded-lg text-[#ed0534] uppercase"
            style={{
              background: isActiveSubCategory(subCategory["_id"])
                ? "#ed0534"
                : "",
              color: isActiveSubCategory(subCategory["_id"]) ? "white" : "",
              outline: "1px solid #ed0534",
            }}
            onClick={() => {
              handleAddSubCategoryToParams(subCategory["_id"]);
            }}
          >
            {subCategory.name}
          </div>
        );
      })}
    </div>
    // <select
    //   onChange={handleAddSubCategoriesToParams}
    //   className="py-2 px-4 w-full rounded-2xl text-lg font-medium bg-[#EBEDED]"
    //   name="subCategory"
    // >
    //   <option value="">Sub Categories</option>
    //   {data?.data?.map((subCategory) => (
    //     <option value={subCategory["_id"]} key={subCategory["_id"]}>
    //       {subCategory.name}
    //     </option>
    //   ))}
    // </select>
  );
}

export default SubCategoriesFiltertation;
