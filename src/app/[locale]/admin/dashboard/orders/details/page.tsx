"use client";
import { useGetAllCategoriesQuery } from "@/lib/features/api/categoriesApi";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import Spinner from "@/ui/Spinner/Spinner";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

function ViewOrderPage() {
  const t = useTranslations("Dashboard");

  const params = useParams();

  const { data: AllCategories } = useGetAllCategoriesQuery("categories");

  if (!AllCategories) return <Spinner />;
  const noCategoriesYet = AllCategories?.data?.length === 0;

  if (noCategoriesYet) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "4rem",
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        {t("No categories yet, please add a new category")}{" "}
        <Link
          href={`/${params.locale}/admin/dashboard/categories/add`}
          style={{ color: "#5b93ff", textDecoration: "underline" }}
        >
          {t("Add New Category")}
        </Link>
      </Box>
    );
  }

  return <Box>(t{"Orders"})</Box>;
}

export default ViewOrderPage;
