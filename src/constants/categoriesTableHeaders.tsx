import CategoryTableMenuOptions from "@/components/AdminCategories/categoryTableMenuOptions";

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
      <div>xxxx</div>;
    },
  },
  {
    Header: "Actions",
    Cell: ({ row }) => <CategoryTableMenuOptions category={row.original} />,
  },
];
