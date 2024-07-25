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
import { useGetAllCategoriesQuery } from "@/lib/features/api/categoriesApi";
import { useLazyGetAllProductsQuery } from "@/lib/features/api/productsApi";
import { useEffect, useState } from "react";
import { Gauge } from "@mui/x-charts/Gauge";
import {
  formatCurrency,
  groupBy,
  groupByUsersByDate,
  prepareUsersAnalyticsData,
} from "@/lib/helpers";
import { OrderStatusEnum } from "@/types/enums";
import { useGetAllUsersQuery } from "@/lib/features/api/usersApi";

const TARGET_GOAL_SALES = 100000;
const data = [
  {
    value: "1,503",
    title: "Daily Signups",
    icon: <RiUserSharedFill />,
    className: "bg-gradient-to-r from-cyan-500 to-blue-500",
  },
  {
    value: "2,201",
    title: "Daily Order",
    icon: <BsFillCartCheckFill />,
    className: "bg-gradient-to-r from-sky-500 to-indigo-500",
  },
  {
    value: "31,503",
    title: "Products",
    icon: <HiCube />,
    className: "bg-gradient-to-r from-violet-500 to-fuchsia-500",
  },
  {
    value: "11,503",
    title: "Categories",
    icon: <HiFolder />,
    className: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
];

function DashBoardPageg() {
  const t = useTranslations("Dashboard");

  const { data: orders, isFetching: isOrdersFetching } =
    useGetAllOrdersQuery("orders");

  const { data: categories, isFetching: isCategoriesFetching } =
    useGetAllCategoriesQuery("categories");

  const [getProductsByCategory, getProductsResponse] =
    useLazyGetAllProductsQuery();

  const [categories_, setCategories_] = useState({});

  const { data: users, isFetching: isUsersFetching } =
    useGetAllUsersQuery("users");

  useEffect(() => {
    if (categories?.data) {
      categories.data.forEach((category) => {
        if (category["_id"]) {
          getProductsByCategory({ categoryId: category["_id"] })
            .unwrap()
            .then((d) => {
              setCategories_((s) => {
                console.log("s[category?.name]", s, d.data);
                return {
                  ...s,
                  [category?.name]: d.data,
                };
              });
            });
        }
      });
    }
  }, [categories]);

  const targetGoalSales =
    (orders?.data
      ?.filter(
        (order) => order.orderStatus.toUpperCase() === OrderStatusEnum.delivered
      )
      ?.reduce((acc, order) => acc + order.orderPrice, 0) /
      TARGET_GOAL_SALES) *
    100;

  const categorizedUsers = groupByUsersByDate(users?.data);

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
          {Object.keys(categories_).length === 0 ? (
            <h1>No products yet</h1>
          ) : (
            <LineChart
              xAxis={[
                {
                  data: prepareUsersAnalyticsData(users?.data)?.map(
                    (key) => `${key}`
                  ),
                  scaleType: "point",
                },
              ]}
              series={[
                {
                  data: prepareUsersAnalyticsData(users?.data)?.map(
                    (key) => categorizedUsers[key].length
                  ),
                  connectNulls: true,
                },
              ]}
              height={300}
              margin={{ top: 10, bottom: 20 }}
            />
          )}
        </AnalysisCard>
        <AnalysisCard title="Categories">
          {isCategoriesFetching ? (
            <Spinner />
          ) : (
            <PieChart
              sx={{
                width: "100%",
                ".MuiChart-root": {
                  width: "100%",
                },
              }}
              series={[
                {
                  data: Object.keys(categories_)?.map((key) => ({
                    id: key,
                    value: categories_[key].length,
                    label: key,
                  })),
                },
              ]}
              width={400}
              height={200}
            />
          )}
        </AnalysisCard>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5 mt-10">
        <AnalysisCard title="Sales">
          {isOrdersFetching ? (
            <Spinner />
          ) : (
            <BarChart
              series={[
                {
                  data: orders.data
                    .slice(0, 10)
                    .map((order) => order.orderPrice),
                },
              ]}
              height={290}
              xAxis={[
                {
                  data: orders.data.slice(0, 10)?.map((c, i) => `O${i + 1}`),
                  scaleType: "band",
                },
              ]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          )}
        </AnalysisCard>
        <AnalysisCard title={`Target (${formatCurrency(TARGET_GOAL_SALES)})`}>
          {Object.keys(categories_).length !== categories?.data?.length ? (
            <Spinner />
          ) : (
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
          )}
        </AnalysisCard>
      </div>
      <div className="grid grid-cols-1 mt-10">
        <AnalysisCard title="Recent orders">
          {isOrdersFetching ? (
            <Spinner />
          ) : (
            <BaseTable
              data={orders?.data?.slice(0, 5)}
              columns={ordersTableHeadersWithoutActions(t)}
            />
          )}
        </AnalysisCard>
      </div>
    </div>
  );
}

export default DashBoardPageg;
