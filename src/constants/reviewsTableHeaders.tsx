"use client";

import ReviewsTableMenuOptions from "@/components/AdminReviews/ReviewsTableMenuOptions";
import { IoStarSharp } from "react-icons/io5";

export const reviewsTableHeaders = (t) => [
  {
    id: "productName",
    header: () => <div>{t("Product name")}</div>,
    accessorKey: "productName",
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
    id: "review",
    header: () => <div>{t("review")}</div>,
    accessorKey: "review",
  },
  {
    id: "stars",
    header: () => <div>{t("stars")}</div>,
    cell: ({
      cell: {
        row: { original },
      },
    }) => {
      let stars = [];
      for (let i = 0; i < original.stars; i++) {
        stars.push(i);
      }
      return (
        <div className="flex gap-2 justify-center">
          {stars.map((star) => (
            <span key={star} style={{ color: "#ecad20" }}>
              {<IoStarSharp />}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: ({
      cell: {
        row: { original },
      },
    }) => <ReviewsTableMenuOptions review={original} />,
  },
];
