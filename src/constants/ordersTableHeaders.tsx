"use client";

import OrdersTableMenuOptions from "@/components/AdminOrders/OrdersTableMenuOptions";
import { formatCurrency } from "@/lib/helpers";
import { OrderStatusEnum } from "@/types/enums";
import OrderStatus from "@/ui/OrderStatus/OrderStatus";

// {
//   "_id": "6695350d9c0d97a542c97861",
//   "transaction_id": "200488407",
//   "user": {
//       "_id": "66951f59f68408ea021da1c3",
//       "name": "test",
//       "email": "test11121313@gmail.com",
//       "role": "user",
//       "isActive": true,
//       "id": "66951f59f68408ea021da1c3"
//   },
//   "orderPrice": 1000,
//   "items": [
//       {
//           "product": null,
//           "price": 200,
//           "quantity": 5,
//           "color": {
//               "value": "Black",
//               "label": "Black",
//               "color": "#000000",
//               "quantity": -35,
//               "_id": "668f0359168e757760b16258"
//           },
//           "_id": "6695350d9c0d97a542c97862"
//       }
//   ],
//   "orderStatus": "created",
//   "billingData": [
//       {
//           "firstName": "John",
//           "lastName": "Doe",
//           "apartment": "5B",
//           "street": "123 Main St",
//           "building": "Sunshine Apartments",
//           "city": "New York",
//           "country": "USA",
//           "floor": "5",
//           "phoneNumber": "123-456-7890",
//           "_id": "6695350d9c0d97a542c97864"
//       }
//   ],
//   "paymentOrderId": "226679309",
//   "createdAt": "2024-07-15T14:41:17.123Z",
//   "updatedAt": "2024-07-15T14:41:17.123Z",
//   "__v": 0
// }

export const ordersTableHeaders = (t) => [
  {
    id: "transactionId",
    header: () => <div>{t("transaction id")}</div>,
    accessorKey: "transaction_id",
  },
  {
    id: "email",
    header: () => <div>{t("Email")}</div>,
    cell: ({
      cell: {
        row: { original },
      },
    }) => original.user?.email,
  },
  {
    id: "mobile",
    header: () => <div>{t("mobile")}</div>,
    cell: ({
      cell: {
        row: { original },
      },
    }) => {
      return original.billingData[0].phoneNumber;
    },
  },
  {
    id: "orderPrice",
    header: () => <div>{t("order price")}</div>,
    accessorKey: "orderPrice",
  },
  {
    id: "orderStatus",
    header: () => <div>{t("order status")}</div>,
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
    header: () => <div>{t("Actions")}</div>,
    cell: ({
      cell: {
        row: { original },
      },
    }) => <OrdersTableMenuOptions order={original} />,
  },
];
export const ordersTableHeadersWithoutActions = (t) => [
  {
    id: "transactionId",
    header: () => <div>{t("transaction id")}</div>,
    accessorKey: "transaction_id",
  },
  {
    id: "email",
    header: () => <div>{t("Email")}</div>,
    cell: ({
      cell: {
        row: { original },
      },
    }) => original.user?.email,
  },
  {
    id: "mobile",
    header: () => <div>{t("mobile")}</div>,
    cell: ({
      cell: {
        row: { original },
      },
    }) => {
      return original.billingData[0].phoneNumber;
    },
  },
  {
    id: "orderPrice",
    header: () => <div>{t("order price")}</div>,
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
    id: "orderStatus",
    header: () => <div>{t("order status")}</div>,
    cell: ({
      cell: {
        row: { original },
      },
    }) => {
      return <OrderStatus status={OrderStatusEnum[original.orderStatus]} />;
    },
  },
];
