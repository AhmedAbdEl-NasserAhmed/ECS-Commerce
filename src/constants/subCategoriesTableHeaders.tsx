"use client";

import SubCategoryTableMenuOptions from "@/components/AdminSubCategories/SubCategoryTableMenuOptions";

export const subCategoriesTableHeaders = [
  {
    id: "name",
    header: () => <div>Name</div>,
    accessorKey: "name",
  },
  {
    id: "description",
    header: () => <div>Description</div>,
    accessorKey: "description",
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
      return <div>{original.category.name}</div>;
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
