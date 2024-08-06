"use client";
import CategoryTableMenuOptions from "@/components/AdminCategories/categoryTableMenuOptions";
import { useGetAllSubCategoriesByCategoryQuery } from "@/lib/features/api/subCategoriesApi";

export const categoriesTableHeaders = (locale) => {
  return [
    {
      id: "name",
      header: () => "name",
      cell: ({
        cell: {
          row: { original },
        },
      }) => <h2>{original.name[locale]}</h2>,
    },
    {
      id: "description",
      header: () => "description",
      cell: ({
        cell: {
          row: { original },
        },
      }) => <h2>{original.description[locale]}</h2>,
    },

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
