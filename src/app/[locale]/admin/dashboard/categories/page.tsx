"use client";

import { categoriesTableHeaders } from "@/constants/categoriesTableHeaders";
import useBaseTablePagination from "@/hooks/useBaseTablePagination/useBaseTablePagination";
import { useLazyGetAdminCategoryQuery } from "@/lib/features/api/categoriesApi";
import BaseTable from "@/ui/BaseReactTable";
import Menus from "@/ui/Menus/Menus";
import Spinner from "@/ui/Spinner/Spinner";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { HiChevronRight } from "react-icons/hi2";

function Categories() {
  const { locale } = useParams();

  const t = useTranslations("Dashboard");

  const [getPaginatedCategories, getPaginatedCategoriesResponse] =
    useLazyGetAdminCategoryQuery();

  const { paginationControllers } = useBaseTablePagination(
    getPaginatedCategoriesResponse?.data?.numPages
  );

  useEffect(() => {
    getPaginatedCategories({
      page: paginationControllers.page + 1,
      limit: paginationControllers.pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationControllers.page, paginationControllers.pageSize]);


  return (
    <Box className=" flex flex-col gap-8 px-[4rem] py-[1.2rem] bg-[#FDFDFD] ">
      <Box className="h-[10vh] flex justify-between items-center">
        <Box className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold  text-gray-600">
            {t("Categories List")}
          </h2>
          <Box className="flex items-center gap-4 text-[1.4rem]">
            <Link className="text-blue-400" href="/">
              {t("Home")}
            </Link>
            <span>
              <HiChevronRight />
            </span>
            <h4>{t("Categories")}</h4>
          </Box>
        </Box>
      </Box>
      <Box className="relative grow flex flex-col gap-8 bg-white rounded-2xl border-2 p-10 border-slate-100 shadow-md">
        <Box className="mb-4">
          <h2 className="text-3xl font-semibold mb-5">{t("Categories")}</h2>
          <span className=" absolute left-0 block h-[1px] w-full bg-gray-200">
            &nbsp;
          </span>
        </Box>
        <Menus>
          {getPaginatedCategoriesResponse.isFetching ? (
            <Spinner />
          ) : (
            <BaseTable
              data={getPaginatedCategoriesResponse?.data?.data}
              isLoading={getPaginatedCategoriesResponse?.isFetching}
              columns={categoriesTableHeaders(locale)}
              paginationControllers={paginationControllers}
            />
          )}
        </Menus>
      </Box>
    </Box>
  );
}

export default Categories;
