"use client";

import { useOrderHeaders } from "@/constants/userOrderHeaders";
import useBaseTablePagination from "@/hooks/useBaseTablePagination/useBaseTablePagination";
import { useGetOrderByUserIdQuery } from "@/lib/features/api/ordersApi";
import { useAppSelector } from "@/lib/hooks";
import BaseTable from "@/ui/BaseReactTable";
import { useEffect } from "react";

function UserOrders() {
  const user = useAppSelector((state) => state.usersSlice.user);

  const { data } = useGetOrderByUserIdQuery(user["_id"]);

  // const { paginationControllers } = useBaseTablePagination(
  //   getPaginatedProductsResponse?.data?.numPages
  // );

  // useEffect(() => {
  //   getPaginatedProducts({
  //     page: paginationControllers.page + 1,
  //     limit: paginationControllers.pageSize,
  //   });
  // }, [paginationControllers.page, paginationControllers.pageSize]);

  return (
    <div className=" p-8 bg-white shadow-[0px_0px_7px_5px_#0000000a] w-full ">
      <h2 className="text-3xl font-semibold">Orders</h2>
      <BaseTable data={data?.data} columns={useOrderHeaders()} />
    </div>
  );
}

export default UserOrders;
