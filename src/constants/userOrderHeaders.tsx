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
    //   id: "orderPrice",
    //   header: () => "Order Price",
    //   accessorKey: "orderPrice",
    // },
    // {
    //   id: "price",
    //   header: () => "Product Price",
    //   accessorKey: "price",
    // },
    // {
    //   id: "color",
    //   header: () => "Product Colors",
    //   cell: ({
    //     cell: {
    //       row: { original },
    //     },
    //   }) => (
    //     <div style={{ gap: "10px" }} className="flex justify-center">
    //       {original.colors.map((color) => (
    //         <span
    //           key={color.label}
    //           style={{
    //             width: "12px",
    //             height: "12px",
    //             borderRadius: "50%",
    //             backgroundColor: color.color,
    //           }}
    //         >
    //           &nbsp;
    //         </span>
    //       ))}
    //     </div>
    //   ),
    // },

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
              <h2>Quantity: {product.quantity}</h2>
              <h2>Price : {product.price}</h2>
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
          {original?.items.map((product, index) => {
            return (
              <div key={index}>
                {product?.color?.map((color) => {
                  return (
                    <span
                      key={color.label}
                      style={{
                        display: "block",
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: color.color,
                      }}
                    >
                      &nbsp;
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      ),
    },

    {
      id: "billingData",
      header: () => "Buyer Information",
      Cell: ({ cell }) => {
        const value = cell.original.billingData;
        console.log("cell", cell);
        return (
          <div style={{ gap: "10px" }} className="flex flex-col">
            {Object.keys(cell).map((key) => {
              return (
                <ul className="flex flex-col" key={key}>
                  <li>
                    {key}: {cell[key]}
                  </li>
                </ul>
              );
            })}
          </div>
        );
      },
    },

    {
      id: "orderStatus",
      header: () => "Order Status",
      accessorKey: "orderStatus",
    },
  ];
};
