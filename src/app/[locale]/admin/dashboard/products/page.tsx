"use client";

import { productTableHeaders } from "@/constants/productTableHeaders";
import useBaseTablePagination from "@/hooks/useBaseTablePagination/useBaseTablePagination";
import {
  useGetAllProductsQuery,
  useLazyGetPaginatedProductsQuery,
} from "@/lib/features/api/productsApi";
import BaseTable from "@/ui/BaseReactTable";
import Menus from "@/ui/Menus/Menus";
import Spinner from "@/ui/Spinner/Spinner";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HiChevronRight } from "react-icons/hi2";

function Products() {
  const [getPaginatedProducts, getPaginatedProductsResponse] =
    useLazyGetPaginatedProductsQuery();

  const { locale } = useParams();

  const t = useTranslations("Dashboard");

  const tIndex = useTranslations("Index");

  const { paginationControllers } = useBaseTablePagination(
    getPaginatedProductsResponse?.data?.numPages
  );

  const [isLoadingImages, setIsLoadingImages] = useState<boolean>(true);

  useEffect(() => {
    getPaginatedProducts({
      page: paginationControllers.page + 1,
      limit: paginationControllers.pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationControllers.page, paginationControllers.pageSize]);

  if (!getPaginatedProductsResponse?.data?.data) return <Spinner />;

  return (
    <Box className=" flex flex-col gap-8 px-[4rem] py-[1.2rem] bg-white ">
      <Box className="h-[10vh] flex justify-between items-center">
        <Box className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold ">{t("Products List")}</h2>
          <Box className="flex items-center gap-4 text-[1.4rem]">
            <Link className="text-[#ed0534]" href="/">
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
          <BaseTable
            data={getPaginatedProductsResponse?.data?.data}
            isLoading={getPaginatedProductsResponse?.isFetching}
            columns={productTableHeaders(
              locale,
              t,
              isLoadingImages,
              setIsLoadingImages
            )}
            paginationControllers={paginationControllers}
          />
        </Menus>
      </Box>
    </Box>
  );
}

export default Products;
