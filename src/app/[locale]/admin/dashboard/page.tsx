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

function page() {
  const t = useTranslations("Dashboard");
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
          <BarChart
            series={[
              { data: [35, 44, 24, 34] },
              { data: [51, 6, 49, 30] },
              { data: [15, 25, 30, 50] },
              { data: [60, 50, 15, 25] },
            ]}
            height={290}
            xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        </AnalysisCard>
        <AnalysisCard title="Products">
          <PieChart
            sx={{
              width: "100%",
              ".MuiChart-root": {
                width: "100%",
              },
            }}
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "series A" },
                  { id: 1, value: 15, label: "series B" },
                  { id: 2, value: 20, label: "series C" },
                ],
              },
            ]}
            width={400}
            height={200}
          />
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
          <BarChart
            series={[
              { data: [35, 44, 24, 34] },
              { data: [51, 6, 49, 30] },
              { data: [15, 25, 30, 50] },
              { data: [60, 50, 15, 25] },
            ]}
            height={290}
            xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
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
              enablePagination={false}
            />
          )}
        </AnalysisCard>
      </div>
    </div>
  );
}

export default page;
