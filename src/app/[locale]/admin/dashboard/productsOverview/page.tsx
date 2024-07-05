"use client";

import { productTableHeaders } from "@/constants/productTableHeaders";
import { useGetAllProductsQuery } from "@/lib/features/api/productsApi";
import BaseTable from "@/ui/BaseTable/BaseTable";
import Menus from "@/ui/Menus/Menus";
import { Box } from "@mui/material";
import Link from "next/link";
import { HiChevronRight } from "react-icons/hi2";

function ProductsOverview() {
  const { data, isFetching } = useGetAllProductsQuery("products");

  console.log("data", data?.data);

  return (
    <Box className=" flex flex-col gap-8 px-[4rem] py-[1.2rem] bg-[#FDFDFD] ">
      <Box className="h-[10vh] flex justify-between items-center">
        <Box className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold  text-gray-600">
            Product List
          </h2>
          <Box className="flex items-center gap-4 text-[1.4rem]">
            <Link className="text-blue-400" href="/">
              Home
            </Link>
            <span>
              <HiChevronRight />
            </span>
            <h4>Products Overview</h4>
          </Box>
        </Box>
      </Box>
      <Box className="relative grow flex flex-col gap-8 bg-white rounded-2xl border-2 p-10 border-slate-100 shadow-md">
        <Box className="mb-4">
          <h2 className="text-3xl font-semibold mb-5">Products Overview</h2>
          <span className=" absolute left-0 block h-[1px] w-full bg-gray-200">
            &nbsp;
          </span>
        </Box>
        {!isFetching && (
          <BaseTable rawData={data?.data} columnsData={productTableHeaders} />
        )}
      </Box>
    </Box>
  );
}

export default ProductsOverview;
