"use client";

import { useOrderHeaders } from "@/constants/userOrderHeaders";
import { useGetOrderByUserIdQuery } from "@/lib/features/api/ordersApi";
import { useAppSelector } from "@/lib/hooks";
import BaseTable from "@/ui/BaseReactTable";

function UserOrders() {
  const user = useAppSelector((state) => state.usersSlice.user);

  const { data } = useGetOrderByUserIdQuery(user["_id"]);

  console.log(user);

  return (
    <div className=" p-8 bg-white shadow-[0px_0px_7px_5px_#0000000a] w-full ">
      <h2 className="text-3xl font-semibold">Orders</h2>
      <BaseTable data={data?.data} columns={useOrderHeaders()} />
    </div>
  );
}

export default UserOrders;
