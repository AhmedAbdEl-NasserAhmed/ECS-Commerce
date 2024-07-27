"use client";

import BaseTimeline from "@/components/BaseTimeline/BaseTimeline";
import orderDetailsColumns from "@/constants/orderDetailsColumns";
import useTimeline from "@/hooks/useTimeline";
import { useGetOrderByIdQuery } from "@/lib/features/api/ordersApi";
import { OrderStatusEnum } from "@/types/enums";
import BaseTable from "@/ui/BaseReactTable";
import Spinner from "@/ui/Spinner/Spinner";
import { useParams } from "next/navigation";
import { skip } from "node:test";
import { useEffect } from "react";

const requestCheckupTimelineStages = [
  {
    id: 1,
    name: "CREATED",
  },
  {
    id: 2,
    name: "SHIPPED",
  },
  {
    id: 3,
    name: "DELIVERING",
  },
  {
    id: 4,
    name: "DELIVERED",
  },
];

function OrderDetails() {
  const { orderId } = useParams();

  const { data, isFetching } = useGetOrderByIdQuery(orderId, {
    skip: !orderId,
  });

  const { timelineData, goNextStage, reset } = useTimeline(
    requestCheckupTimelineStages
  );

  console.log("data?.data?.orderStatus", data?.data?.orderStatus);

  useEffect(() => {
    reset();
    switch (data?.data?.orderStatus.toUpperCase()) {
      case OrderStatusEnum.created: {
        goNextStage();
        break;
      }
      case OrderStatusEnum.shipped: {
        goNextStage();
        goNextStage();
        break;
      }
      case OrderStatusEnum.delivering: {
        goNextStage();
        goNextStage();
        goNextStage();
        break;
      }
      case OrderStatusEnum.delivered: {
        goNextStage();
        goNextStage();
        goNextStage();
        goNextStage();
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data?.orderStatus]);

  const selectedOrderItems = data?.data.items;

  if (isFetching) return <Spinner />;

  return (
    <div className=" p-8 bg-white w-full text-center ">
      <h2 className="text-3xl font-bold flex justify-center mb-10 capitalize">
        ORDER DETAILS
      </h2>

      <div className="mb-20 px-40">
        <BaseTimeline
          activeStageIndex={timelineData.activeStageIndex}
          completedStagesIndexes={timelineData.completedStagesIndexes}
          stages={requestCheckupTimelineStages}
        />
      </div>

      <BaseTable
        data={selectedOrderItems}
        columns={orderDetailsColumns()}
        isLoading={isFetching}
        paginationControllers={false}
      />
    </div>
  );
}

export default OrderDetails;
