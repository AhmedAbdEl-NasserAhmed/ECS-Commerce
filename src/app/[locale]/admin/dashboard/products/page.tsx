"use client";

import { productTableHeaders } from "@/constants/productTableHeaders";
import { useGetAllProductsQuery } from "@/lib/features/api/productsApi";
import BaseTable from "@/ui/BaseReactTable";
import Menus from "@/ui/Menus/Menus";
import Spinner from "@/ui/Spinner/Spinner";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { HiChevronRight } from "react-icons/hi2";

function Products() {
  const { data, isFetching } = useGetAllProductsQuery("products");

  const t = useTranslations("Dashboard");

  const tIndex = useTranslations("Index");

  return (
    <Box className=" flex flex-col gap-8 px-[4rem] py-[1.2rem] bg-[#FDFDFD] ">
      <Box className="h-[10vh] flex justify-between items-center">
        <Box className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold  text-gray-600">
            {t("Products List")}
          </h2>
          <Box className="flex items-center gap-4 text-[1.4rem]">
            <Link className="text-blue-400" href="/">
              {tIndex("Home")}
            </Link>
            <span>
              <HiChevronRight />
            </span>
            <h4>{t("Products")}</h4>
          </Box>
        </Box>
      </Box>
      <Box className="relative grow flex flex-col gap-8 bg-white rounded-2xl border-2 p-10 border-slate-100 shadow-md">
        <Box className="mb-4">
          <h2 className="text-3xl font-semibold mb-5">{t("Products")}</h2>
          <span className=" absolute left-0 block h-[1px] w-full bg-gray-200">
            &nbsp;
          </span>
        </Box>
        <Menus>
          {isFetching ? (
            <Spinner />
          ) : (
            <BaseTable data={data?.data} columns={productTableHeaders(t)} />
          )}
        </Menus>
      </Box>
    </Box>
  );
}

export default Products;
