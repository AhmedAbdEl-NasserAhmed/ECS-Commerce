"use client";
import SubCategoryTableMenuOptions from "@/components/AdminSubCategories/SubCategoryTableMenuOptions";
import Link from "next/link";
import { useParams } from "next/navigation";

export const subCategoriesTableHeaders = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Description",
    accessor: "description",
  },
  {
    Header: "Category",
    Cell: ({ row }) => {
      // const params = useParams();
      if (!row.original?.category) return <div>No category available</div>;
      return (
        <div
          style={{
            background: "#eaeaea",
            padding: "2px 10px",
            borderRadius: "3px",
          }}
        >
          {row.original.category.name}
        </div>
        // <Link
        //   href={`/${params.locale}/admin/dashboard/categories/${row.original.category["_id"]}`}
        //   className="text-[#6262ff]"
        //   style={{ color: "#6262ff", textDecoration: "underline" }}
        // >
        //   {row.original.category.name}
        // </Link>
      );
    },
  },

  {
    Header: "Actions",
    Cell: ({ row }) => (
      <SubCategoryTableMenuOptions subCategory={row.original} />
    ),
  },
];
