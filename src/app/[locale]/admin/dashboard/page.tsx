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
import {
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,
} from "@/lib/features/api/productsApi";
import { useEffect, useState } from "react";
import { Gauge } from "@mui/x-charts/Gauge";

const TARGET_GOAL_SALES = 10000;
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

const _data = {
  data: [
    {
      _id: "1234",
      email: "khalednasser788@gmail.com",
      mobile: "0124561244",
      orderPrice: 800,
      status: "purchased",
      transactionId: "#0123442211",
    },
  ],
};

const isFetching = false;

function DashBoardPageg() {
  const t = useTranslations("Dashboard");

  const { data: orders, isFetching: isOrdersFetching } =
    useGetAllOrdersQuery("orders");

  const { data: categories, isFetching: isCategoriesFetching } =
    useGetAllCategoriesQuery("categories");

  const [getProductsByCategory, getProductsResponse] =
    useLazyGetAllProductsQuery();

  const [categories_, setCategories_] = useState({});

  function groupBy(groupKey = "name", list) {
    let output = {};

    for (let i = 0; i < list.length; i++) {
      if (list[i][groupKey] in output) {
        output[list[i][groupKey]] = output[list[i][groupKey]].concat(list[i]);
      } else {
        output[list[i][groupKey]] = [list[i]];
      }
    }

    return output;
  }

  useEffect(() => {
    if (categories?.data) {
      categories.data.forEach((category) => {
        if (category["_id"]) {
          getProductsByCategory({ categoryId: category["_id"] })
            .unwrap()
            .then((d) => {
              setCategories_((s) => {
                return {
                  ...s,
                  [category?.name]: {
                    ...groupBy("name", d.data),
                  },
                };
              });
            });
        }
      });
    }
  }, [categories]);

  const targetGoalSales =
    (orders?.data?.reduce((acc, order) => acc + order.orderPrice, 0) /
      TARGET_GOAL_SALES) *
    100;

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
        <AnalysisCard title="Orders">
          {isOrdersFetching ? (
            <Spinner />
          ) : (
            <BarChart
              series={[
                {
                  data: orders.data
                    .slice(0, 5)
                    .map((order) => order.orderPrice),
                },
              ]}
              height={290}
              xAxis={[{ data: ["O1", "O2", "O3", "O4"], scaleType: "band" }]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
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
                  data: categories.data.slice(0, 3).map((category) => ({
                    id: category["_id"],
                    value: 10,
                    label: category.name,
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
        <AnalysisCard title="Signups">
          <LineChart
            xAxis={[
              {
                data: [
                  "Page A",
                  "Page B",
                  "Page C",
                  "Page D",
                  "Page E",
                  "Page F",
                  "Page G",
                ],
                scaleType: "point",
              },
            ]}
            series={[
              {
                data: [4000, 3000, 2000, null, 1890, 2390, 3490],
                connectNulls: true,
              },
            ]}
            height={300}
            margin={{ top: 10, bottom: 20 }}
          />
        </AnalysisCard>
        <AnalysisCard title="Categories">
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
              // ...
            />
          )}
        </AnalysisCard>
      </div>
      <div className="grid grid-cols-1 mt-10">
        <AnalysisCard title="Recent orders">
          {isFetching ? (
            <Spinner />
          ) : (
            <BaseTable
              data={_data?.data}
              columns={ordersTableHeadersWithoutActions(t)}
            />
          )}
        </AnalysisCard>
      </div>
    </div>
  );
}

export default DashBoardPageg;
