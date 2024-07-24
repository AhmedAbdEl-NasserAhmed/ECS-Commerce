"use client";

import Menus from "@/ui/Menus/Menus";
import Spinner from "@/ui/Spinner/Spinner";
import { Box } from "@mui/material";
import Link from "next/link";
import { HiChevronRight } from "react-icons/hi2";

import BaseTable from "@/ui/BaseReactTable";
import { ordersTableHeaders } from "@/constants/ordersTableHeaders";
import { useTranslations } from "next-intl";
import { useLazyGetAllOrdersQuery } from "@/lib/features/api/ordersApi";
import useBaseTablePagination from "@/hooks/useBaseTablePagination/useBaseTablePagination";
import { useEffect } from "react";

function Orders() {
  const t = useTranslations("Dashboard");
  const [getPaginatedOrders, getPaginatedOrdersResponse] =
    useLazyGetAllOrdersQuery();

  const { paginationControllers } = useBaseTablePagination(
    getPaginatedOrdersResponse?.data?.numPages
  );

  useEffect(() => {
    getPaginatedOrders({
      page: paginationControllers.page + 1,
      limit: paginationControllers.pageSize,
    });
  }, [paginationControllers.page, paginationControllers.pageSize]);

  return (
    <Box className=" flex flex-col gap-8 px-[4rem] py-[1.2rem] bg-[#FDFDFD] ">
      <Box className="h-[10vh] flex justify-between items-center">
        <Box className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold  text-gray-600">
            {t("Orders List")}
          </h2>
          <Box className="flex items-center gap-4 text-[1.4rem]">
            <Link className="text-blue-400" href="/">
              {t("Home")}
            </Link>
            <span>
              <HiChevronRight />
            </span>
            <h4>{t("Orders")}</h4>
          </Box>
        </Box>
      </Box>
      <Box className="relative grow flex flex-col gap-8 bg-white rounded-2xl border-2 p-10 border-slate-100 shadow-md">
        <Box className="mb-4">
          <h2 className="text-3xl font-semibold mb-5">{t("Orders")}</h2>
          <span className=" absolute left-0 block h-[1px] w-full bg-gray-200">
            &nbsp;
          </span>
        </Box>
        <Menus>
          {getPaginatedOrdersResponse.isFetching ? (
            <Spinner />
          ) : (
            <BaseTable
              isLoading={getPaginatedOrdersResponse.isFetching}
              paginationControllers={paginationControllers}
              data={getPaginatedOrdersResponse?.data?.data}
              columns={ordersTableHeaders(t)}
            />
          )}
        </Menus>
      </Box>
    </Box>
  );
}

export default Orders;
