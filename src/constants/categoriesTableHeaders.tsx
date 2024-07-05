"use client";
import CategoryTableMenuOptions from "@/components/AdminCategories/categoryTableMenuOptions";
import { useGetAllSubCategoriesByCategoryQuery } from "@/lib/features/api/subCategoriesApi";

export const categoriesTableHeaders = () => {
  return [
    {
      id: "name",
      header: () => "Category",
      accessorKey: "name",
    },
    {
      id: "description",
      header: () => "Description",
      accessorKey: "description",
    },
    // {
    //   id: "sub-categories",
    //   header: () => "Sub categories",
    //   cell: ({
    //     cell: {
    //       row: { original },
    //     },
    //   }) => {
    //     if (isFetching || !data || data?.data?.length === 0)
    //       return <div>No Sub Categories</div>;
    //     return (
    //       <ul className="flex gap-2 items-cneter justify-center flex-wrap">
    //         {data?.data?.map((subCategory) => {
    //           return (
    //             <li
    //               key={subCategory["_id"]}
    //               className=""
    //               style={{
    //                 background: "#eaeaea",
    //                 padding: "2px 10px",
    //                 borderRadius: "3px",
    //               }}
    //             >
    //               {subCategory.name}
    //             </li>
    //           );
    //         })}
    //       </ul>
    //     );
    //   },
    // },
    {
      id: "actions",
      header: () => "Actions",
      cell: ({
        cell: {
          row: { original },
        },
      }) => <CategoryTableMenuOptions category={original} />,
    },
  ];
};
