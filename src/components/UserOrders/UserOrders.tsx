"use client";

import { orders } from "@/constants/orders";
import { useOrderHeaders } from "@/constants/userOrderHeaders";
import { useGetAllOrdersQuery } from "@/lib/features/api/ordersApi";
import BaseTable from "@/ui/BaseReactTable";

function UserOrders() {
  const { data, isLoading } = useGetAllOrdersQuery("orders");

  return (
    <div className=" p-8 bg-white shadow-[0px_0px_7px_5px_#0000000a] w-full ">
      <h2 className="text-3xl font-semibold">Orders</h2>
      <BaseTable data={orders} columns={useOrderHeaders()} />
    </div>
  );
}

export default UserOrders;
