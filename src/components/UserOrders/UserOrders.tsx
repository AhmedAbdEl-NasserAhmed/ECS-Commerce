"use client";

import { useOrderHeaders } from "@/constants/userOrderHeaders";
import useBaseTablePagination from "@/hooks/useBaseTablePagination/useBaseTablePagination";
import { useLazyGetOrderByUserIdQuery } from "@/lib/features/api/ordersApi";
import { useAppSelector } from "@/lib/hooks";
import BaseTable from "@/ui/BaseReactTable";
import { Alert } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

function UserOrders() {
  const user = useAppSelector((state) => state.usersSlice.user);

  const userTranslation = useTranslations("user");
  const tMessage = useTranslations("messages");

  const { locale } = useParams();

  const [getPaginatedOrders, getPaginatedOrdersResponse] =
    useLazyGetOrderByUserIdQuery();

  const { paginationControllers } = useBaseTablePagination(
    getPaginatedOrdersResponse?.data?.numPages
  );

  useEffect(() => {
    getPaginatedOrders({
      userId: user["_id"],
      query: {
        page: paginationControllers.page + 1,
        limit: paginationControllers.pageSize,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Alert
        severity="warning"
        sx={{
          mb: "2rem",
          display: "flex",
          alignItems: "center",
          fontSize: "1.4rem",
        }}
      >
        {tMessage("order is not created alert")}{" "}
        <Link
          href={`/${locale}/user/contact`}
          style={{ color: "blue", textDecoration: "underline" }}
        >
          {userTranslation("Contact Us")}
        </Link>
      </Alert>
      <div className=" p-8 bg-white shadow-[0px_0px_7px_5px_#0000000a] w-full text-center capitalize ">
        <h2 className="text-3xl font-semibold mb-10">
          {userTranslation("Orders")}
        </h2>
        <BaseTable
          data={getPaginatedOrdersResponse?.data?.data || []}
          columns={useOrderHeaders(userTranslation, locale)}
          isLoading={getPaginatedOrdersResponse?.isFetching}
          paginationControllers={paginationControllers}
        />
      </div>
    </>
  );
}

export default UserOrders;
