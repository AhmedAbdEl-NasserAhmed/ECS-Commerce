"use client";

import FlexWrapper from "@/ui/FlexWrapper/FlexWrapper";
import { Box } from "@mui/material";
import { RiUserSharedFill } from "react-icons/ri";
import { HiCube, HiFolder } from "react-icons/hi2";
import { BsFillCartCheckFill } from "react-icons/bs";
import AnalysisCard from "@/ui/AnalysisCard/AnalysisCard";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart, PieChart } from "@mui/x-charts";
import BaseTable from "@/ui/BaseReactTable";
import Spinner from "@/ui/Spinner/Spinner";
import { ordersTableHeadersWithoutActions } from "@/constants/ordersTableHeaders";
import { useTranslations } from "next-intl";
import { useGetAllOrdersQuery } from "@/lib/features/api/ordersApi";
import { useMemo } from "react";
import { Gauge } from "@mui/x-charts/Gauge";
import { formatCurrency } from "@/lib/helpers";
import { OrderStatusEnum } from "@/types/enums";

import { useGetAnalyticsDataQuery } from "@/lib/features/api/dashboardApi";
import { useParams } from "next/navigation";

const TARGET_GOAL_SALES = 100000;

function DashBoardPageg() {
  const t = useTranslations("Dashboard");

  const { data: orders } = useGetAllOrdersQuery("orders");

  const { locale } = useParams();

  const { data: analytics, isFetching: isAnalyticsFetching } =
    useGetAnalyticsDataQuery("analytics");

  const targetGoalSales =
    (orders?.data
      ?.filter(
        (order) => order.orderStatus.toUpperCase() === OrderStatusEnum.delivered
      )
      ?.reduce((acc, order) => acc + order.orderPrice, 0) /
      TARGET_GOAL_SALES) *
    100;

  const data = useMemo(() => {
    return [
      {
        value: analytics?.userCount || 0,
        title: "Users",
        icon: <RiUserSharedFill />,
        className: "bg-gradient-to-r from-cyan-500 to-blue-500",
      },
      {
        value: analytics?.orderCount || 0,
        title: "Orders",
        icon: <BsFillCartCheckFill />,
        className: "bg-gradient-to-r from-sky-500 to-indigo-500",
      },
      {
        value: analytics?.productCount || 0,
        title: "Products",
        icon: <HiCube />,
        className: "bg-gradient-to-r from-violet-500 to-fuchsia-500",
      },
      {
        value: analytics?.categoryCount || 0,
        title: "Categories",
        icon: <HiFolder />,
        className: "bg-gradient-to-r from-purple-500 to-pink-500",
      },
    ];
  }, [analytics]);

  if (isAnalyticsFetching) return <Spinner />;
  if (!analytics) return <p>Something went wrong!</p>;

  return (
    <div className="px-[4rem] py-[1.2rem] mt-5">
      <FlexWrapper className="gap-9">
        {data.map((dataItem) => {
          return (
            <Box
              key={dataItem.title}
              className={`flex items-center flex-wrap justify-between rounded-2xl gap-3 text-[white] p-8 grow ${dataItem.className}`}
            >
              <Box>
                <p className="text-6xl mb-2 font-medium">{dataItem.value}</p>
                <p className="text-xl">{dataItem.title}</p>
              </Box>
              <Box className="text-8xl">{dataItem.icon}</Box>
            </Box>
          );
        })}
      </FlexWrapper>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5 mt-10">
        <AnalysisCard title="Users">
          <LineChart
            xAxis={[
              {
                data: analytics?.users?.map((user) => user["_id"]),
                scaleType: "point",
              },
            ]}
            series={[
              {
                data: analytics?.users?.map((user) => user.users.length),
                connectNulls: true,
              },
            ]}
            height={300}
            margin={{ top: 10, bottom: 20 }}
          />
        </AnalysisCard>
        <AnalysisCard title="Categories">
          <PieChart
            sx={{
              width: "100%",
              ".MuiChart-root": {
                width: "100%",
              },
            }}
            series={[
              {
                data: analytics?.productCountForLast10Categories
                  ?.filter((p) => p.value)
                  ?.map((p) => ({
                    ...p,
                    id: p.id.en,
                    label: p.label.en,
                  })),
              },
            ]}
            width={400}
            height={200}
          />
        </AnalysisCard>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5 mt-10">
        <AnalysisCard title="Sales">
          <BarChart
            series={[
              {
                data: analytics?.last10Orders?.map((order) => order.orderPrice),
              },
            ]}
            height={290}
            xAxis={[
              {
                data: analytics?.last10Orders?.map((c, i) => `O${i + 1}`),
                scaleType: "band",
              },
            ]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        </AnalysisCard>
        <AnalysisCard title={`Target (${formatCurrency(TARGET_GOAL_SALES)})`}>
          <Gauge
            value={targetGoalSales}
            height={290}
            startAngle={0}
            endAngle={360}
            innerRadius="80%"
            outerRadius="100%"
            sx={{ fontSize: "3rem", fontWeight: "bold" }}
            text={targetGoalSales.toFixed(2) + "%"}
          />
        </AnalysisCard>
      </div>
      <div className="grid grid-cols-1 mt-10">
        <AnalysisCard title="Recent orders">
          <BaseTable
            data={analytics?.last10Orders?.slice(0, 5)}
            columns={ordersTableHeadersWithoutActions(t)}
          />
        </AnalysisCard>
      </div>
    </div>
  );
}

export default DashBoardPageg;
