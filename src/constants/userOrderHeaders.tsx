import ProductTableMenuOptions from "@/components/AdminProduct/productTableMenuOptions";
import UserOrdersOptions from "@/components/UserOrders/UserOrdersOptions";
import { formatCurrency } from "@/lib/helpers";
import { OrderStatusEnum } from "@/types/enums";
import OrderStatus from "@/ui/OrderStatus/OrderStatus";
import Image from "next/image";

export const useOrderHeaders = () => {
  return [
    {
      id: "transaction_id",
      header: () => "Transaction Id",
      accessorKey: "transaction_id",
    },

    {
      id: "orderPrice",
      header: () => "Total Price",
      accessorKey: "orderPrice",
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        return formatCurrency(original.orderPrice);
      },
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
      id: "orderStatus",
      header: () => <div>{"order status"}</div>,
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        return <OrderStatus status={OrderStatusEnum[original.orderStatus]} />;
      },
    },

    {
      id: "actions",
      header: () => "Actions",
      cell: ({
        cell: {
          row: { original },
        },
      }) => <UserOrdersOptions order={original} />,
    },
  ];
};
