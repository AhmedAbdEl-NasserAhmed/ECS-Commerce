"use client";

import BaseTimeline from "@/components/BaseTimeline/BaseTimeline";
import orderDetailsColumns from "@/constants/orderDetailsColumns";
import { requestCheckupTimelineStages } from "@/constants/orderStatus";
import useTimeline from "@/hooks/useTimeline";
import { useGetOrderByIdQuery } from "@/lib/features/api/ordersApi";
import { formatCurrency } from "@/lib/helpers";
import { OrderStatusEnum } from "@/types/enums";
import BaseTable from "@/ui/BaseReactTable";
import Spinner from "@/ui/Spinner/Spinner";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { skip } from "node:test";
import { useEffect } from "react";

function OrderDetails() {
  const { orderId } = useParams();

  const { locale } = useParams();

  const { data, isFetching } = useGetOrderByIdQuery(orderId, {
    skip: !orderId,
  });

  const userTranslation = useTranslations("user");

  const { timelineData, goNextStage, reset } = useTimeline(
    requestCheckupTimelineStages(userTranslation)
  );

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

  const totalOrderPrice = selectedOrderItems?.reduce((acc, cur) => {
    return acc + cur.price * cur.quantity;
  }, 0);

  if (isFetching) return <Spinner />;

  return (
    <div className=" p-8 bg-white w-full text-center ">
      <h2 className="text-3xl font-bold flex justify-center mb-10 capitalize">
        {userTranslation("ORDER DETAILS")}
      </h2>

      <div className="mb-20 px-8 md:px-20">
        <BaseTimeline
          activeStageIndex={timelineData.activeStageIndex}
          completedStagesIndexes={timelineData.completedStagesIndexes}
          stages={requestCheckupTimelineStages(userTranslation)}
        />
      </div>

      <div className="my-32">
        <h2 className="text-[2rem] font-bold">
          {userTranslation("Total Price")}:{" "}
          {formatCurrency(totalOrderPrice, locale as string)}
        </h2>
      </div>

      <BaseTable
        data={selectedOrderItems}
        columns={orderDetailsColumns(userTranslation, locale)}
        isLoading={isFetching}
        paginationControllers={false}
      />
    </div>
  );
}

export default OrderDetails;
