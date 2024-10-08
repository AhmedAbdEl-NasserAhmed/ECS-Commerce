"use client";

import { subCategoriesTableHeaders } from "@/constants/subCategoriesTableHeaders";
import { useLazyGetAllAdminSubCategoriesQuery } from "@/lib/features/api/subCategoriesApi";
import Menus from "@/ui/Menus/Menus";
import Spinner from "@/ui/Spinner/Spinner";
import { Box } from "@mui/material";
import Link from "next/link";
import { HiChevronRight } from "react-icons/hi2";

import BaseTable from "@/ui/BaseReactTable";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import useBaseTablePagination from "@/hooks/useBaseTablePagination/useBaseTablePagination";
import { useParams } from "next/navigation";

function SubCategories() {
  const { locale } = useParams();

  const t = useTranslations("Dashboard");

  const [getPaginatedSubCategories, getPaginatedSubCategoriesResponse] =
    useLazyGetAllAdminSubCategoriesQuery();

  const { paginationControllers } = useBaseTablePagination(
    getPaginatedSubCategoriesResponse?.data?.numPages
  );

  useEffect(() => {
    getPaginatedSubCategories({
      page: paginationControllers.page + 1,
      limit: paginationControllers.pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationControllers.page, paginationControllers.pageSize]);

  if (getPaginatedSubCategoriesResponse.isLoading) return <Spinner />;

  return (
    <Box className=" flex flex-col gap-8 px-[4rem] py-[1.2rem] bg-[#FDFDFD] ">
      <Box className="h-[10vh] flex justify-between items-center">
        <Box className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold  text-gray-600">
            {t("Collections List")}
          </h2>
          <Box className="flex items-center gap-4 text-[1.4rem]">
            <Link className="text-blue-400" href={`/${locale}/admin/dashboard`}>
              {t("Home")}
            </Link>
            <span>
              <HiChevronRight />
            </span>
            <h4>{t("Collections")}</h4>
          </Box>
        </Box>
      </Box>
      <Box className="relative grow flex flex-col gap-8 bg-white rounded-2xl border-2 p-10 border-slate-100 shadow-md">
        <Box className="mb-4">
          <h2 className="text-3xl font-semibold mb-5">{t("Collections")}</h2>
          <span className=" absolute left-0 block h-[1px] w-full bg-gray-200">
            &nbsp;
          </span>
        </Box>
        <Menus>
          {getPaginatedSubCategoriesResponse.isFetching ? (
            <Spinner />
          ) : (
            <BaseTable
              isLoading={getPaginatedSubCategoriesResponse.isFetching}
              paginationControllers={paginationControllers}
              data={getPaginatedSubCategoriesResponse?.data?.data}
              columns={subCategoriesTableHeaders(locale, t)}
            />
          )}
        </Menus>
      </Box>
    </Box>
  );
}

export default SubCategories;
