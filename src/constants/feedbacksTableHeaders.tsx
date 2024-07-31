"use client";

import FeedbacksTableMenuOptions from "@/components/AdminFeedbacks/FeedbacksTableMenuOptions";
import ReviewsTableMenuOptions from "@/components/AdminReviews/ReviewsTableMenuOptions";
import { IoStarSharp } from "react-icons/io5";

export const feedbacksTableHeaders = (t) => [
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
    id: "email",
    header: () => <div>{t("Email")}</div>,
    cell: ({
      cell: {
        row: { original },
      },
    }) => {
      return (
        <div className="flex gap-2 justify-center">
          <h2>{original?.user?.email}</h2>
        </div>
      );
    },
  },

  {
    id: "title",
    header: () => <div>{t("review")}</div>,
    accessorKey: "title",
  },
  // {
  //   id: "actions",
  //   header: () => <div>Actions</div>,
  //   cell: ({
  //     cell: {
  //       row: { original },
  //     },
  //   }) => <FeedbacksTableMenuOptions feedback={original} />,
  // },
];
