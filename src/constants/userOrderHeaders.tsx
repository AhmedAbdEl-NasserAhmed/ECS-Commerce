import ProductTableMenuOptions from "@/components/AdminProduct/productTableMenuOptions";
import UserOrdersOptions from "@/components/UserOrders/UserOrdersOptions";
import { formatCurrency } from "@/lib/helpers";
import { OrderStatusEnum } from "@/types/enums";
import OrderStatus from "@/ui/OrderStatus/OrderStatus";
import Image from "next/image";

export const useOrderHeaders = (userTranslation, locale) => {
  return [
    {
      id: "transaction_id",
      header: () => userTranslation("Transaction Id"),
      accessorKey: "transaction_id",
    },

    {
      id: "orderPrice",
      header: () => userTranslation("Total Price"),
      accessorKey: "orderPrice",
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        return formatCurrency(original.orderPrice, locale);
      },
    },

    {
      id: "billingData",
      header: () => userTranslation("First Name"),
      cell: ({
        cell: {
          row: { original },
        },
      }) => (
        <div style={{ gap: "10px" }} className="flex justify-center">
          {original?.billingData.map((data) => {
            return (
              <div key={data.firstName}>
                <h2>{data.firstName}</h2>
              </div>
            );
          })}
        </div>
      ),
    },

    {
      id: "billingData",
      header: () => userTranslation("Phone Number"),
      cell: ({
        cell: {
          row: { original },
        },
      }) => (
        <div style={{ gap: "10px" }} className="flex justify-center">
          {original?.billingData.map((data) => {
            return (
              <div key={data.phoneNumber}>
                <h2> {data.phoneNumber}</h2>
              </div>
            );
          })}
        </div>
      ),
    },

    {
      id: "orderStatus",
      header: () => <div> {userTranslation("order status")}</div>,
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        return <OrderStatus status={OrderStatusEnum[original.orderStatus]} />;
      },
    },
    {
      id: "paymentMethod",
      header: () => <div>{userTranslation("payment method")}</div>,
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        return original.paymentMethod;
      },
    },
    {
      id: "actions",
      header: () => userTranslation("Actions"),
      cell: ({
        cell: {
          row: { original },
        },
      }) => <UserOrdersOptions order={original} />,
    },
  ];
};
