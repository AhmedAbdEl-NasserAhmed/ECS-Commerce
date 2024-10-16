"use client";
import PromocodeTableMenuOptions from "@/components/AdminPromocodes/promocodeTableMenuOptions";

export const promocodesTableHeaders = (locale, t) => {
  return [
    {
      id: "code",
      header: () => t("Promocode"),
      cell: ({
        cell: {
          row: { original },
        },
      }) => <h2>{original.code}</h2>,
    },
    {
      id: "expiration",
      header: () => t("Expired At"),
      cell: ({
        cell: {
          row: { original },
        },
      }) => <h2>{original.expirationDate.slice(0, 10)}</h2>,
    },
    {
      id: "discount",
      header: () => t("Product Discount %"),
      cell: ({
        cell: {
          row: { original },
        },
      }) => <h2>{original.discount + "%"}</h2>,
    },
    {
      id: "status",
      header: () => t("Status"),
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        const isExpired =
          new Date() >= new Date(original.expirationDate.slice(0, 10));
        return (
          <h2 style={{ color: `${isExpired ? "#e74c3c" : "#2ecc71"}` }}>
            {isExpired ? t("expired") : t("active")}
          </h2>
        );
      },
    },
    {
      id: "actions",
      header: () => "Actions",
      cell: ({
        cell: {
          row: { original },
        },
      }) => <PromocodeTableMenuOptions promocode={original} />,
    },
  ];
};
