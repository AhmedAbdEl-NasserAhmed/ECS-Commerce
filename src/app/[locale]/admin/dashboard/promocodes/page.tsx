"use client";

import { categoriesTableHeaders } from "@/constants/categoriesTableHeaders";
import { promocodesTableHeaders } from "@/constants/promocodesTableHeaders";
import useBaseTablePagination from "@/hooks/useBaseTablePagination/useBaseTablePagination";
import { useLazyGetAllPromocodesQuery } from "@/lib/features/api/promocodesApi";
import BaseTable from "@/ui/BaseReactTable";
import Menus from "@/ui/Menus/Menus";
import Spinner from "@/ui/Spinner/Spinner";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { HiChevronRight } from "react-icons/hi2";

function PromoCodes() {
  const { locale } = useParams();

  const t = useTranslations("Dashboard");

  const [getPaginatedPromoCodes, getPaginatedPromoCodesResponse] =
    useLazyGetAllPromocodesQuery();

  const { paginationControllers } = useBaseTablePagination(
    getPaginatedPromoCodesResponse?.data?.numPages
  );

  useEffect(() => {
    getPaginatedPromoCodes({
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
            {t("Promocodes")}
          </h2>
          <Box className="flex items-center gap-4 text-[1.4rem]">
            <Link className="text-blue-400" href={`/${locale}/admin/dashboard`}>
              {t("Home")}
            </Link>
            <span>
              <HiChevronRight />
            </span>
            <h4>{t("Promocodes")}</h4>
          </Box>
        </Box>
      </Box>
      <Box className="relative grow flex flex-col gap-8 bg-white rounded-2xl border-2 p-10 border-slate-100 shadow-md">
        <Box className="mb-4">
          <h2 className="text-3xl font-semibold mb-5">{t("Promocodes")}</h2>
          <span className=" absolute left-0 block h-[1px] w-full bg-gray-200">
            &nbsp;
          </span>
        </Box>
        <Menus>
          {getPaginatedPromoCodesResponse.isFetching ? (
            <Spinner />
          ) : (
            <BaseTable
              data={getPaginatedPromoCodesResponse?.data?.data}
              isLoading={getPaginatedPromoCodesResponse?.isFetching}
              columns={promocodesTableHeaders(locale, t)}
              paginationControllers={paginationControllers}
            />
          )}
        </Menus>
      </Box>
    </Box>
  );
}

export default PromoCodes;
