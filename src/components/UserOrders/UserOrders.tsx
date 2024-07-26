"use client";

import { useOrderHeaders } from "@/constants/userOrderHeaders";
import useBaseTablePagination from "@/hooks/useBaseTablePagination/useBaseTablePagination";
import { useLazyGetOrderByUserIdQuery } from "@/lib/features/api/ordersApi";
import { useAppSelector } from "@/lib/hooks";
import BaseTable from "@/ui/BaseReactTable";
import { useEffect } from "react";

function UserOrders() {
  const user = useAppSelector((state) => state.usersSlice.user);

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
  }, []);

  return (
    <div className=" p-8 bg-white shadow-[0px_0px_7px_5px_#0000000a] w-full text-center capitalize ">
      <h2 className="text-3xl font-semibold mb-10">Orders</h2>
      <BaseTable
        data={getPaginatedOrdersResponse?.data?.data}
        columns={useOrderHeaders()}
        isLoading={getPaginatedOrdersResponse?.isFetching}
        paginationControllers={paginationControllers}
      />
    </div>
  );
}

export default UserOrders;
