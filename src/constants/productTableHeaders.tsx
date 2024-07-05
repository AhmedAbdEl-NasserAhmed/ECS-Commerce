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
    Header: "Product Size",
    accessor: "size",
    Cell: ({ cell: { value } }) => value.value, // Access the `value` property of the `size` object
  },
  {
    Header: "Product Colors",
    accessor: "colors",
    Cell: ({ cell: { value } }) => (
      <div style={{ gap: "10px" }} className="flex justify-center">
        {value.map((color) => (
          <span
            key={color.label}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: color.color,
            }}
          >
            &nbsp;
          </span>
        ))}
      </div>
    ),
  },
  {
    Header: "Product Image",
    accessor: "images",
    Cell: ({ cell: { value } }) => (
      <div style={{ gap: "20px" }} className="flex justify-center ">
        <Image
          className="rounded-xl"
          key={value[0].id}
          src={value[0].url}
          alt={`Product Image ${value[0].id}`}
          height={55}
          width={55}
        />
      </div>
    ),
  },

  {
    Header: "Actions",
    Cell: ({ row }) => <ProductTableMenuOptions product={row.original} />,
  },
];
