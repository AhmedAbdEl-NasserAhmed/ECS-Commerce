"use client";

import Menus from "@/ui/Menus/Menus";
import Spinner from "@/ui/Spinner/Spinner";
import { Box } from "@mui/material";
import Link from "next/link";
import { HiChevronRight } from "react-icons/hi2";
import BaseTable from "@/ui/BaseReactTable";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { reviewsTableHeaders } from "@/constants/reviewsTableHeaders";
import { useLazyGetAllAdminReviewsQuery } from "@/lib/features/api/reviewsApi";
import useBaseTablePagination from "@/hooks/useBaseTablePagination/useBaseTablePagination";
import { useEffect } from "react";
import { useGetSingleProductByIDQuery } from "@/lib/features/api/productsApi";

function Reviews() {
  const { locale } = useParams();

  const [getPaginatedReviews, getPaginatedReviewsResponse] =
    useLazyGetAllAdminReviewsQuery();

  // const { data: product, isFetching } = useGetSingleProductByIDQuery(1);

  const { paginationControllers } = useBaseTablePagination(
    getPaginatedReviewsResponse?.data?.numPages
  );

  useEffect(() => {
    getPaginatedReviews({
      page: paginationControllers.page + 1,
      limit: paginationControllers.pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationControllers.page, paginationControllers.pageSize]);

  const t = useTranslations("Dashboard");

  return (
    <Box className=" flex flex-col gap-8 px-[4rem] py-[1.2rem] bg-[#FDFDFD] ">
      <Box className="h-[10vh] flex justify-between items-center">
        <Box className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold  text-gray-600">
            {t("Reviews List")}
          </h2>
          <Box className="flex items-center gap-4 text-[1.4rem]">
            <Link className="text-blue-400" href={`/${locale}/admin/dashboard`}>
              {t("Home")}
            </Link>
            <span>
              <HiChevronRight />
            </span>
            <h4>{t("Reviews")}</h4>
          </Box>
        </Box>
      </Box>
      <Box className="relative grow flex flex-col gap-8 bg-white rounded-2xl border-2 p-10 border-slate-100 shadow-md">
        <Box className="mb-4">
          <h2 className="text-3xl font-semibold mb-5">{t("Reviews")}</h2>
          <span className=" absolute left-0 block h-[1px] w-full bg-gray-200">
            &nbsp;
          </span>
        </Box>
        <Menus>
          {getPaginatedReviewsResponse.isFetching ? (
            <Spinner />
          ) : (
            <BaseTable
              isLoading={getPaginatedReviewsResponse.isFetching}
              paginationControllers={paginationControllers}
              data={getPaginatedReviewsResponse?.data?.data}
              columns={reviewsTableHeaders(t, locale as string)}
            />
          )}
        </Menus>
      </Box>
    </Box>
  );
}

export default Reviews;
