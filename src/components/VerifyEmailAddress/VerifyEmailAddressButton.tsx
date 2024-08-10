"use client";

import { useTranslations } from "next-intl";

interface Props {
  onClick?: () => void;
}

function VerifyEmailAddressButton({ onClick }: Props) {
  const t = useTranslations("user");
  return (
    <button onClick={onClick} className="text-2xl font-bold">
      {t("HERE")}
    </button>
  );
}

export default VerifyEmailAddressButton;
