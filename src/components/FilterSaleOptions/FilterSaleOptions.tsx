import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Switch } from "@mui/material";

const FilterSaleOptions = () => {
  const { replace } = useRouter();

  const searchParams = useSearchParams();

  const currentSale = searchParams.get("sale");

  const pathName = usePathname();

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const handleChange = (_, value) => {
    const params = new URLSearchParams(searchParams);
    params.set("sale", value);
    replace(`${pathName}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center justify-center">
      <Switch {...label} onChange={handleChange} />
    </div>
  );
};

export default FilterSaleOptions;
