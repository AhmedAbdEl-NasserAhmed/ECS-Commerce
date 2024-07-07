"use client";

import OrdersTableMenuOptions from "@/components/AdminOrders/OrdersTableMenuOptions";

export const ordersTableHeaders = (t) => [
  {
    id: "transactionId",
    header: () => <div>{t("transaction id")}</div>,
    accessorKey: "transactionId",
  },
  {
    id: "email",
    header: () => <div>{t("Email")}</div>,
    accessorKey: "email",
  },
  {
    id: "mobile",
    header: () => <div>{t("mobile")}</div>,
    accessorKey: "mobile",
  },
  {
    id: "orderPrice",
    header: () => <div>{t("order price")}</div>,
    accessorKey: "orderPrice",
  },
  {
    id: "orderStatus",
    header: () => <div>{t("order status")}</div>,
    accessorKey: "status",
  },
  {
    id: "actions",
    header: () => <div>Actions</div>,
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
    accessorKey: "transactionId",
    enableColumnFilter: false, // disable column filtering for this column
  },
  {
    id: "email",
    header: () => <div>{t("Email")}</div>,
    accessorKey: "email",
    enableColumnFilter: false, // disable column filtering for this column
  },
  {
    id: "mobile",
    header: () => <div>{t("mobile")}</div>,
    accessorKey: "mobile",
    enableColumnFilter: false, // disable column filtering for this column
  },
  {
    id: "orderPrice",
    header: () => <div>{t("order price")}</div>,
    accessorKey: "orderPrice",
    enableColumnFilter: false, // disable column filtering for this column
  },
  {
    id: "orderStatus",
    header: () => <div>{t("order status")}</div>,
    accessorKey: "status",
    enableColumnFilter: false, // disable column filtering for this column
  },
];
