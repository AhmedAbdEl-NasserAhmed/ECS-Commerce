import { FlagIcon } from "react-flag-kit";

export function languages(t) {
  return [
    {
      language: t("Arabic"),
      icon: <FlagIcon code="EG" size={24} style={{ display: "flex" }} />,
      value: "ar",
    },
    {
      language: t("English"),
      icon: <FlagIcon code="GB" size={24} />,
      value: "en",
    },
  ];
}
