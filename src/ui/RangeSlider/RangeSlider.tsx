"use client";

import { Slider } from "@mui/material";
import { useTranslations } from "next-intl";

function valuetext(value: number) {
  return `${value}EGP`;
}

function RangeSlider({ value, handleChange }) {
  const t = useTranslations("user");

  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-semibold capitalize">{t("Price")}</h2>
      <div className="text-lg flex items-center justify-between font-semibold gap-4">
        <span>
          {value[0]} {""}
          {t("EGP")}
        </span>
        <span>
          {value[1]} {""} {t("EGP")}
        </span>
      </div>
      <Slider
        sx={{ color: "red", width: "95%", margin: "auto" }}
        min={1}
        max={5000}
        getAriaLabel={() => t("Price range")}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="off"
        getAriaValueText={valuetext}
      />
    </div>
  );
}

export default RangeSlider;
