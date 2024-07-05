"use client";

import { categoriesTableHeaders } from "@/constants/categoriesTableHeaders";
import { productTableHeaders } from "@/constants/productTableHeaders";
import { useGetAllCategoriesQuery } from "@/lib/features/api/categoriesApi";
import BaseTable from "@/ui/BaseTable/BaseTable";
import Menus from "@/ui/Menus/Menus";
import Spinner from "@/ui/Spinner/Spinner";
import { Box } from "@mui/material";
import Link from "next/link";
import { HiChevronRight } from "react-icons/hi2";

function SubCategoriesOverview() {
  const { data, isFetching } = useGetAllCategoriesQuery("categories");

  return (
    <Box className=" flex flex-col gap-8 px-[4rem] py-[1.2rem] bg-[#FDFDFD] ">
      <Box className="h-[10vh] flex justify-between items-center">
        <Box className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold  text-gray-600">
            Sub Categories List
          </h2>
          <Box className="flex items-center gap-4 text-[1.4rem]">
            <Link className="text-blue-400" href="/">
              Home
            </Link>
            <span>
              <HiChevronRight />
            </span>
            <h4>Sub Categories Overview</h4>
          </Box>
        </Box>
      </Box>
      <Box className="relative grow flex flex-col gap-8 bg-white rounded-2xl border-2 p-10 border-slate-100 shadow-md">
        <Box className="mb-4">
          <h2 className="text-3xl font-semibold mb-5">
            Sub Categories Overview
          </h2>
          <span className=" absolute left-0 block h-[1px] w-full bg-gray-200">
            &nbsp;
          </span>
        </Box>
        <Menus>
          {isFetching ? (
            <Spinner />
          ) : (
            <BaseTable
              rawData={data?.data}
              columnsData={categoriesTableHeaders}
            />
          )}
        </Menus>
      </Box>
    </Box>
  );
}

export default SubCategoriesOverview;
