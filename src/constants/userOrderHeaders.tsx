import ProductTableMenuOptions from "@/components/AdminProduct/productTableMenuOptions";
import Image from "next/image";

export const useOrderHeaders = () => {
  return [
    {
      id: "transaction_id",
      header: () => "Transaction Id",
      accessorKey: "transaction_id",
    },
    // {
    //   id: "price",
    //   header: () => "Product Price",
    //   accessorKey: "price",
    //   size: 100,
    // },

    // {
    //   id: "price",
    //   header: () => "Product Price",
    //   accessorKey: "price",
    // },
    // {

    {
      id: "items",
      header: () => "Order Items",
      cell: ({
        cell: {
          row: { original },
        },
      }) => (
        <div style={{ gap: "10px" }} className="flex justify-center">
          {original.items.map((product) => (
            <div key={product["_id"]} className="flex flex-col gap-4">
              <h2>Product : {product.product.name}</h2>
              <h2>Quantity: {product.quantity}</h2>
              <h2>Price : {product.price}</h2>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "items",
      header: () => "Order Size",
      cell: ({
        cell: {
          row: { original },
        },
      }) => (
        <div style={{ gap: "10px" }} className="flex justify-center">
          {original.items.map((product) => (
            <div key={product["_id"]} className="flex flex-col gap-4">
              <h2>Size: {product.product.size.value}</h2>
            </div>
          ))}
        </div>
      ),
    },

    {
      id: "items",
      header: () => "Order Colors",
      cell: ({
        cell: {
          row: { original },
        },
      }) => (
        <div style={{ gap: "10px" }} className="flex justify-center">
          {original?.items.map((product) => {
            return (
              <span
                key={product.color["_id"]["$oid"]}
                style={{
                  display: "block",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: product.color.color,
                }}
              >
                &nbsp;
              </span>
            );
          })}
        </div>
      ),
    },

    {
      id: "billingData",
      header: () => "Product Bill Details",
      cell: ({
        cell: {
          row: { original },
        },
      }) => (
        <div style={{ gap: "10px" }} className="flex justify-center">
          {original?.billingData.map((data) => {
            return (
              <div key={data["_id"]}>
                <h2>Name : {data.firstName}</h2>
                <h2> Number : {data.phoneNumber}</h2>
              </div>
            );
          })}
        </div>
      ),
    },

    {
      id: "orderPrice",
      header: () => "Total Price",
      accessorKey: "orderPrice",
    },

    {
      id: "orderStatus",
      header: () => "Order Status",
      accessorKey: "orderStatus",
    },
  ];
};
