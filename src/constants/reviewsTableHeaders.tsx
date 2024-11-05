"use client";

import ReviewsTableMenuOptions from "@/components/AdminReviews/ReviewsTableMenuOptions";
import { IoStarSharp } from "react-icons/io5";

export const reviewsTableHeaders = (t, lang = "en") => [
  {
    id: "user",
    header: () => <div>{t("User name")}</div>,
    cell: ({
      cell: {
        row: { original },
      },
    }) => {
      return (
        <div className="flex gap-2 justify-center">
          <h2>{original?.user?.name}</h2>
        </div>
      );
    },
  },

  {
    id: "title",
    header: () => <div>{t("review")}</div>,
    accessorKey: "title",
  },
  {
    id: "product",
    header: () => <div>{t("Product Name")}</div>,
    accessorKey: "title",
    cell: ({
      cell: {
        row: { original },
      },
    }) => {
      return (
        <p>
          {original.product.name[lang]} {original.product.size.value}
        </p>
      );
    },
  },
  {
    id: "ratings",
    header: () => <div>{t("stars")}</div>,
    cell: ({
      cell: {
        row: { original },
      },
    }) => {
      let stars = [];
      for (let i = 0; i < original.ratings; i++) {
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
