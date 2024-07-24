import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createTheme, Switch } from "@mui/material";

const theme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&.Mui-checked": {
            color: "red",
            "& + .MuiSwitch-track": {
              backgroundColor: "red",
            },
          },
        },
        track: {
          backgroundColor: "grey",
          opacity: 1,
        },
        thumb: {
          backgroundColor: "white",
        },
      },
    },
  },
});

const FilterSaleOptions = () => {
  const { replace } = useRouter();

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const pathName = usePathname();

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const handleChange = (_, value) => {
    const params = new URLSearchParams(searchParams);
    params.set("sale", value ? value : "");
    replace(`${pathName}?${params.toString()}`, { scroll: false });
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center">
      <Switch
        {...label}
        onChange={handleChange}
        style={{ color: isChecked ? "red" : "grey" }}
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked": {
            color: "red",
            "& + .MuiSwitch-track": {
              backgroundColor: "#ed0534",
            },
          },
          "& .MuiSwitch-track": {
            backgroundColor: "#161616",
            opacity: 1,
          },
        }}
      />
    </div>
  );
};

export default FilterSaleOptions;
