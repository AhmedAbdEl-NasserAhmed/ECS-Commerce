"use client";

import { useGetAllSubCategoriesByCategoryQuery } from "@/lib/features/api/subCategoriesApi";
import Spinner from "../Spinner/Spinner";
import { useParams, useRouter } from "next/navigation";

function CollectionList({ id }) {
  const { data, isLoading } = useGetAllSubCategoriesByCategoryQuery(id, {
    skip: !id,
  });

  const { locale } = useParams();

  const { replace } = useRouter();

  if (isLoading) return <Spinner />;

  const handleClick = (subCategoryId: string) => {
    replace(`/${locale}/user/productsList/${id}?&subCategory=${subCategoryId}`);
  };

  return (
    <ul className="flex flex-col gap-7 self-start ">
      {data?.data.map((subCategory) => {
        return (
          <li
            className="px-4 py-2 group duration-100 rounded-sm transition-all"
            key={subCategory["_id"]}
          >
            <button onClick={() => handleClick(subCategory["_id"])}>
              <div>{subCategory.name?.[locale as string]}</div>
              <div className="w-0 group-hover:w-full h-px bg-black duration-100 transition-all"></div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default CollectionList;
