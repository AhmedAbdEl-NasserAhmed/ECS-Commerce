"use client";

export const feedbacksTableHeaders = (t) => [
  {
    id: "name",
    header: () => <div>{t("User name")}</div>,
    cell: ({
      cell: {
        row: { original },
      },
    }) => {
      return (
        <div className="flex gap-2 justify-center">
          <h2>{original?.name}</h2>
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
          <h2>{original?.email}</h2>
        </div>
      );
    },
  },

  {
    id: "message",
    header: () => <div>{t("feedback")}</div>,
    accessorKey: "message",
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
