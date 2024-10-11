"use client";

import BaseTimeline from "@/components/BaseTimeline/BaseTimeline";
import orderDetailsColumns from "@/constants/orderDetailsColumns";
import { requestCheckupTimelineStages } from "@/constants/orderStatus";
import useTimeline from "@/hooks/useTimeline";
import {
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} from "@/lib/features/api/ordersApi";
import { formatCurrency } from "@/lib/helpers";
import { OrderStatusEnum } from "@/types/enums";
import BaseTable from "@/ui/BaseReactTable";
import OrderStatus from "@/ui/OrderStatus/OrderStatus";
import Spinner from "@/ui/Spinner/Spinner";
import { Alert } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

function OrderDetails() {
  const { orderId, locale } = useParams();

  const { data, isFetching } = useGetOrderByIdQuery(orderId, {
    skip: !orderId,
  });

  const _dummy = {
    _id: "6709164406e58185725fe5d1",
    transaction_id: "1728648772237",
    user: {
      _id: "66bf67d0f792c1d16898ca6c",
      name: "Khaled",
      email: "khalednasser788@gmail.com",
      role: "user",
      isActive: true,
      id: "66bf67d0f792c1d16898ca6c",
    },
    orderPrice: 4800,
    paymentMethod: "cash",
    items: [
      {
        product: {
          name: {
            en: "test",
            ar: "تيست",
          },
          size: {
            value: "XS",
            label: "XS",
            color: "#666666",
          },
          images: [
            {
              url: "http://res.cloudinary.com/dtvumfiux/image/upload/v1728051902/xrabgtuzkukeoxjnkxcq.jpg",
              id: "xrabgtuzkukeoxjnkxcq",
            },
            {
              url: "http://res.cloudinary.com/dtvumfiux/image/upload/v1728051904/ssccniaqvhuzso5a0qn7.jpg",
              id: "ssccniaqvhuzso5a0qn7",
            },
          ],
        },
        price: 1200,
        quantity: 4,
        color: {
          value: "IndianRed",
          label: "IndianRed",
          color: "#d64c4c",
          quantity: 5,
          _id: "66fffac0aaf4494eec424e61",
        },
        _id: "6709164406e58185725fe5d2",
      },
    ],
    orderStatus: "DELIVERED".toLowerCase(),
    billingData: [
      {
        firstName: "Khaled",
        lastName: "Nasser",
        apartment: "٣",
        street:
          "السويس, ميدان الاربعين, شارع مصطفي الوكيل اما مطعم دينا بجوار المسجد الاقصي",
        building: "٣٦",
        city: "Suez",
        country: "Egypt",
        floor: "٣",
        phoneNumber: "01208741247",
        _id: "6709164406e58185725fe5d4",
      },
    ],
    paymentOrderId: "1728648772239",
    createdAt: "2024-10-11T12:12:52.245Z",
    updatedAt: "2024-10-11T12:31:10.765Z",
    __v: 0,
  };

  const [updateOrder, updateOrderResponse] = useUpdateOrderMutation();

  const userTranslation = useTranslations("user");

  const { timelineData, goNextStage, reset } = useTimeline(
    requestCheckupTimelineStages(userTranslation)
  );

  const cancelOrderHandler = () => {
    updateOrder({
      body: { orderStatus: OrderStatusEnum.cancelled.toLowerCase() },
      orderId,
    })
      .unwrap()
      .then(() => {
        toast.success(userTranslation("Your order has been cancelled"));
        reset();
      })
      .catch((err) => {
        toast.error(userTranslation(err?.data?.message));
      });
  };

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

  const isVisa = data?.data?.paymentMethod === "visa";
  const isRefunded = data?.data?.orderStatus === "refund";
  const isCancelled = data?.data?.orderStatus === "cancelled";
  const isCreated = data?.data?.orderStatus === "created";
  const cannotBeCancelled = !isCreated && !isCancelled && !isRefunded;


  return (
    <div className=" p-8 bg-white w-full text-center ">
      <h2 className="text-3xl font-bold flex justify-center capitalize mb-10">
        {userTranslation("ORDER DETAILS")} - &nbsp;&nbsp;&nbsp;&nbsp;
        <OrderStatus status={OrderStatusEnum[data?.data?.orderStatus]} />
      </h2>

      {cannotBeCancelled && (
        <Alert
          severity="warning"
          sx={{
            mb: "2rem",
            display: "flex",
            alignItems: "center",
            fontSize: "1.4rem",
          }}
        >
          {userTranslation("cannot cancel order warning message")}{" "}
        </Alert>
      )}

      {!isVisa && isCreated && (
        <div className="flex justify-between items-center mb-10">
          {updateOrderResponse.isLoading ? (
            <Spinner />
          ) : (
            <div
              className={`rounded-md text-white bg-black text-2xl flex items-center justify-center p-3 hover:text-black hover:bg-white text-black transition-all duration-200`}
            >
              <IoMdClose fontSize={"2rem"} className="mr-2" />
              <button
                onClick={cancelOrderHandler}
                className="disabled:opacity-30"
              >
                {" "}
                {userTranslation("Cancel order")}
              </button>
            </div>
          )}
        </div>
      )}

      {!isRefunded && !isCancelled && (
        <div className="mb-32 px-8 md:px-20">
          <BaseTimeline
            activeStageIndex={timelineData.activeStageIndex}
            completedStagesIndexes={timelineData.completedStagesIndexes}
            stages={requestCheckupTimelineStages(userTranslation)}
          />
        </div>
      )}
      <h2
        className="mt-[5rem] mb-[3rem] text-[2rem] pb-[2rem]"
        style={{
          borderBottom: " 1px solid #F5F5F5",
        }}
      >
        {userTranslation("Total Price")}{" "}
        {formatCurrency(totalOrderPrice, locale as string)}
      </h2>

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
