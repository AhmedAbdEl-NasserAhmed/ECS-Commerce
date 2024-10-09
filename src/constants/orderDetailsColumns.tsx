import { formatCurrency } from "@/lib/helpers";
import { OrderStatusEnum } from "@/types/enums";
import OrderStatus from "@/ui/OrderStatus/OrderStatus";
import Image from "next/image";

export function orderDetailsColumns(userTranslation, locale) {
  return [
    {
      id: "productImage",
      header: () => userTranslation("Product Image"),
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
              src={original?.product?.images?.[0]?.url || ""}
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
      header: () => userTranslation("Product Name"),
      accessorKey: "productName",
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        return <h2>{original?.product?.name?.[locale]}</h2>;
      },
    },

    {
      id: "ProductPrice",
      header: () => userTranslation("Product Price"),
      accessorKey: "ProductPrice",
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        return formatCurrency(original?.price, locale as string);
      },
    },

    {
      id: "productQuantity",
      header: () => userTranslation("Product Quantity"),
      accessorKey: "productQuantity",
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        return <h2>{original?.quantity}</h2>;
      },
    },
    {
      id: "total",
      header: () => userTranslation("Total"),
      accessorKey: "total",
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        return formatCurrency(
          original?.quantity * original?.price,
          locale as string
        );
      },
    },
    {
      id: "productSize",
      header: () => userTranslation("Product Size"),
      accessorKey: "productSize",
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        return <h2>{original?.product?.size?.value}</h2>;
      },
    },
    {
      id: "productColor",
      header: () => userTranslation("Product Color"),
      accessorKey: "productColor",
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        return (
          <div className="flex items-center justify-center w-full">
            <span
              style={{ backgroundColor: original?.color?.value }}
              className=" w-4 h-4 rounded-full flex items-center justify-center"
            ></span>
          </div>
        );
      },
    },
  ];
}

export default orderDetailsColumns;
