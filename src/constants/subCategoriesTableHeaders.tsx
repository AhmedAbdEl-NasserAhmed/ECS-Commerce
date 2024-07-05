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
    cell: ({
      cell: {
        row: { original },
      },
    }) => {
      // const params = useParams();
      if (!original?.category) return <div>No category available</div>;
      return (
        <div
          style={{
            background: "#eaeaea",
            padding: "2px 10px",
            borderRadius: "3px",
          }}
        >
          {original.category.name}
        </div>
        // <Link
        //   href={`/${params.locale}/admin/dashboard/categories/${original.category["_id"]}`}
        //   className="text-[#6262ff]"
        //   style={{ color: "#6262ff", textDecoration: "underline" }}
        // >
        //   {original.category.name}
        // </Link>
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
