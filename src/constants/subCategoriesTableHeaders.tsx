"use client";

import SubCategoryTableMenuOptions from "@/components/AdminSubCategories/SubCategoryTableMenuOptions";

export function subCategoriesTableHeaders(locale) {
  return [
    {
      id: "name",
      header: () => "Name",
      cell: ({
        cell: {
          row: { original },
        },
      }) => <h2>{original.name[locale]}</h2>,
    },

    {
      id: "category",
      header: () => <div>Category</div>,
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
