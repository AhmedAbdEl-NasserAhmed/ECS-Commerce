"use client";
import BaseTimeline from "@/components/BaseTimeline/BaseTimeline";
import useTimeline from "@/hooks/useTimeline";
import {
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} from "@/lib/features/api/ordersApi";
import { OrderStatusEnum } from "@/types/enums";
import { AdminProductProps } from "@/types/types";
import MultiChoiceSelectMenu from "@/ui/MultiChoiceSelectMenu/MultiChoiceSelectMenu";
import OrderStatus from "@/ui/OrderStatus/OrderStatus";
import Spinner from "@/ui/Spinner/Spinner";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Box, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { HiChevronRight } from "react-icons/hi2";

export const requestCheckupTimelineStages = [
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

function ViewOrder() {
  const params = useParams();

  const { locale } = useParams();

  const router = useRouter();

  const { data: order, isFetching } = useGetOrderByIdQuery(params.id, {
    skip: !params.id,
  });

  const tIndex = useTranslations("Index");

  const { timelineData, goNextStage, goPrevStage } = useTimeline(
    requestCheckupTimelineStages
  );

  const t = useTranslations("Dashboard");

  useEffect(() => {
    switch (order?.data?.orderStatus.toUpperCase()) {
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
  }, [order?.data?.orderStatus]);

  if (isFetching) return <Spinner />;

  return (
    <Box>
      <Box className="h-[10vh] flex justify-between items-center p-5">
        <Box className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold  text-gray-600">
            {t("View Order")}
          </h2>
          <Box className="flex items-center gap-4 text-[1.4rem]">
            <Link className="text-[#ed0534]" href="/">
              {tIndex("Home")}
            </Link>
            <span>
              <HiChevronRight />
            </span>
            <h4>{t("Orders")}</h4>
          </Box>
        </Box>
        <Button
          sx={{
            paddingInline: "1.6rem",
            paddingBlock: "1rem",
            fontSize: "1.3rem",
            borderRadius: "5px",
            backgroundColor: "#ed0534",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "gray",
              boxShadow: "none",
            },
          }}
          type="button"
          variant="contained"
          size="large"
        >
          {tIndex("View All")}
        </Button>
      </Box>
      <Box
        sx={{
          paddingInline: "7rem",
          marginBottom: "5rem",
        }}
      >
        <BaseTimeline
          activeStageIndex={timelineData.activeStageIndex}
          completedStagesIndexes={timelineData.completedStagesIndexes}
          stages={requestCheckupTimelineStages}
        />
      </Box>
      <Box className="p-5 relative grow flex flex-col gap-8 bg-white rounded-2xl border-2 p-10 border-slate-100 shadow-md">
        <Box className="mb-4">
          <h2 className="text-3xl font-semibold mb-5">{t("View Order")}</h2>
          <span className=" absolute left-0 block h-[1px] w-full bg-gray-200">
            &nbsp;
          </span>
        </Box>

        <Box className="flex gap-8 flex-col lg:flex-row justify-between ">
          <Box className="w-full lg:w-[70%] ">
            <Box className="relative grid grid-cols-autofill-minmax gap-12">
              {/* DATA ITEM */}
              <Box>
                <p>{t("Transaction Id")}</p>
                <p>{order?.data?.transaction_id}</p>
              </Box>
              {/* DATA ITEM */}
              <Box>
                <p>{t("Email")}</p>
                <p>{order?.data?.user?.email}</p>
              </Box>
              {/* DATA ITEM */}
              <Box>
                <p>{t("mobile")}</p>
                <p>{order?.data?.billingData?.[0]?.phoneNumber}</p>
              </Box>
              {/* DATA ITEM */}
              <Box>
                <p>{t("order price")}</p>
                <p>{order?.data?.orderPrice}</p>
              </Box>
              {/* DATA ITEM */}
              <Box>
                <p>{t("order status")}</p>
                <OrderStatus
                  status={OrderStatusEnum[order?.data?.orderStatus]}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ViewOrder;
