"use client";
import CategoryTableMenuOptions from "@/components/AdminCategories/categoryTableMenuOptions";

export const categoriesTableHeaders = (locale, t) => {
  return [
    {
      id: "name",
      header: () => t("Category Name"),
      cell: ({
        cell: {
          row: { original },
        },
      }) => <h2>{original.name[locale]}</h2>,
    },
    {
      id: "description",
      header: () => t("Category Description"),
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
