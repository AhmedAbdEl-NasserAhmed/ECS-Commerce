import { formatCurrency } from "@/lib/helpers";
import Image from "next/image";

export function orderDetailsColumns() {
  return [
    {
      id: "productImage",
      header: () => "Product Image",
      accessorKey: "productImage",
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        return (
          <div className="flex justify-center">
            <Image
              className="rounded-md"
              src={original?.product?.images[0].url || ""}
              alt="product-image"
              width={50}
              height={50}
            />
          </div>
        );
      },
    },
    {
      id: "productName",
      header: () => "Product Name",
      accessorKey: "productName",
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        return <h2>{original.product?.name}</h2>;
      },
    },

    {
      id: "ProductPrice",
      header: () => "Product Price",
      accessorKey: "ProductPrice",
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        return formatCurrency(original.product?.saleProduct);
      },
    },
    {
      id: "productQuantity",
      header: () => "Product Quantity",
      accessorKey: "productQuantity",
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        return <h2>{original.quantity}</h2>;
      },
    },
    {
      id: "productSize",
      header: () => "Product Size",
      accessorKey: "productSize",
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        return <h2>{original?.product?.size.value}</h2>;
      },
    },
    {
      id: "productColor",
      header: () => "Product Color",
      accessorKey: "productColor",
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        return (
          <div className="flex items-center justify-center w-full">
            <span
              style={{ backgroundColor: original.color.value }}
              className=" w-4 h-4 rounded-full flex items-center justify-center"
            ></span>
          </div>
        );
      },
    },
  ];
}

export default orderDetailsColumns;
