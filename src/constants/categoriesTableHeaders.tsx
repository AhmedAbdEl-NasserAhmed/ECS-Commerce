"use client";
import CategoryTableMenuOptions from "@/components/AdminCategories/categoryTableMenuOptions";
import { useGetAllSubCategoriesByCategoryQuery } from "@/lib/features/api/subCategoriesApi";

export const categoriesTableHeaders = [
  {
    Header: "Category",
    accessor: "name",
  },
  {
    Header: "Description",
    accessor: "description",
  },
  {
    Header: "Sub categories",
    Cell: ({ row }) => {
      const { data, isFetching } = useGetAllSubCategoriesByCategoryQuery(
        row.original["_id"]
      );
      if (isFetching || !data || data?.data?.length === 0)
        return <div>No Sub Categories</div>;
      return (
        <ul className="flex gap-2 items-cneter justify-center flex-wrap">
          {data?.data?.map((subCategory) => {
            return (
              <li
                key={subCategory["_id"]}
                className=""
                style={{
                  background: "#eaeaea",
                  padding: "2px 10px",
                  borderRadius: "3px",
                }}
              >
                {subCategory.name}
              </li>
            );
          })}
        </ul>
      );
    },
  },
  {
    Header: "Actions",
    Cell: ({ row }) => <CategoryTableMenuOptions category={row.original} />,
  },
];
