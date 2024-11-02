"use client";

import SubCategoryTableMenuOptions from "@/components/AdminSubCategories/SubCategoryTableMenuOptions";
import Image from "next/image";

export function subCategoriesTableHeaders(locale, t) {
  return [
    {
      id: "name",
      header: () => t("Collection Name"),
      cell: ({
        cell: {
          row: { original },
        },
      }) => <h2>{original.name[locale]}</h2>,
    },

    {
      id: "category",
      header: () => t("Category Name"),
      accessorKey: "category",
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        if (!original?.category) return <div>No category available</div>;
        return <div>{original.category.name[locale]}</div>;
      },
    },
    {
      id: "size-chart",
      header: () => t("Size chart"),
      accessorKey: "size-chart",
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        if (!original?.photo?.url)
          return <div>{`No ${t("Size chart")} available`}</div>;

        return (
          <div style={{ gap: "20px" }} className="flex justify-center ">
            <Image
              className="rounded-xl"
              key={original?.photo?.id}
              src={original?.photo?.url}
              alt={`Product Image ${original?.photo?.id || ""}`}
              height={55}
              width={55}
            />
          </div>
        );
      },
    },

    {
      id: "actions",
      header: () => <div>Actions</div>,
      cell: ({
        cell: {
          row: { original },
        },
      }) => <SubCategoryTableMenuOptions subCategory={original} />,
    },
  ];
}
