"use client";

import { Box } from "@mui/material";
import { useTranslations } from "next-intl";

function ViewFeedbackPage() {
  const t = useTranslations("Dashboard");

  return <Box>{t("Reviews")}</Box>;
}

export default ViewFeedbackPage;
