import ProductTableMenuOptions from "@/components/AdminProduct/productTableMenuOptions";
import { Box } from "@mui/material";
import Image from "next/image";

export const productTableHeaders = [
  {
    Header: "Product Name",
    accessor: "name",
  },
  {
    Header: "Product Price",
    accessor: "price",
  },
  {
    Header: "Product Discount",
    accessor: "discount",
  },
  {
    Header: "Product Images",
    accessor: "images",
    Cell: ({ cell: { value } }) => (
      <div style={{ gap: "20px" }} className="flex justify-center ">
        <Image
          key={value[0].id}
          src={value[0].url}
          alt={`Product Image ${value[0].id}`}
          height={50}
          width={50}
        />
      </div>
    ),
  },
  {
    Header: "Product Size",
    accessor: "size",
    Cell: ({ cell: { value } }) => value.value, // Access the `value` property of the `size` object
  },

  {
    Header: "Actions",
    Cell: ({ row }) => <ProductTableMenuOptions product={row.original} />,
  },
];
