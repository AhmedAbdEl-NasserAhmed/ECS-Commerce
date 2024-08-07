"use client";

import { useGetAllSubCategoriesQuery } from "@/lib/features/api/subCategoriesApi";
import {
  usePathname,
  useSearchParams,
  useRouter,
  useParams
} from "next/navigation";

import { ChangeEvent, useEffect, useState } from "react";

function SubCategoriesFiltertation() {
  const [filtredSubCategories, setFiltredSubCategories] = useState<string[]>(
    []
  );

  const { locale } = useParams();

  const [subCategories, setSubCategories] = useState<string[]>([]);

  const { data } = useGetAllSubCategoriesQuery("sucCategories");

  const pathName = usePathname();

  const searchParams = useSearchParams();

  const subCategoriesUrl = searchParams.get("subCategory");

  const { replace } = useRouter();

  useEffect(() => {
    if (subCategoriesUrl !== "") {
      setFiltredSubCategories(subCategoriesUrl?.split(","));
    }
  }, [subCategoriesUrl]);

  useEffect(() => {
    if (filtredSubCategories?.length > 0) {
      setSubCategories(filtredSubCategories);
    }
  }, [filtredSubCategories]);

  const isActiveSubCategory = (subCategory) =>
    subCategories.includes(subCategory);

  const updateUrl = () => {
    const newSelectedItems = [...subCategories];

    const params = new URLSearchParams(searchParams);

    const query = newSelectedItems.join(",");

    params.set("subCategory", query);

    const newUrl = `${pathName}?${params.toString()}`;

    replace(newUrl, { scroll: false });

    return newSelectedItems;
  };

  const handleAddSubCategoryToParams = (subCategory) => {
    if (subCategory !== "" && !isActiveSubCategory(subCategory)) {
      setSubCategories((data) => [...data, subCategory]);
    } else {
      setSubCategories((s) => s.filter((c) => c !== subCategory));
    }
  };

  useEffect(() => {
    updateUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subCategories]);

  return (
    <div className="flex gap-[1.3rem] flex-wrap justify-center">
      {data?.data?.map((subCategory) => {
        return (
          <div
            key={subCategory["_id"]}
            className="cursor-pointer font-semibold px-3 py-5 bg-white text-center rounded-lg text-[#161616] uppercase"
            style={{
              background: isActiveSubCategory(subCategory["_id"])
                ? "#ed0534"
                : "",
              color: isActiveSubCategory(subCategory["_id"]) ? "white" : "",
              outline: "1px solid #161616"
            }}
            onClick={() => {
              handleAddSubCategoryToParams(subCategory["_id"]);
            }}
          >
            {subCategory.name?.[locale as string]}
          </div>
        );
      })}
    </div>
  );
}

export default SubCategoriesFiltertation;
