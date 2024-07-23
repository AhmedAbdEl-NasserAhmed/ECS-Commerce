import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterSaleOptions = () => {
  const { replace } = useRouter();

  const searchParams = useSearchParams();

  const currentSale = searchParams.get("sale");

  const [selected, setSelected] = useState(currentSale);

  const pathName = usePathname();

  const handleChange = (event) => {
    setSelected(event.target.name === selected ? "" : event.target.name);
    const params = new URLSearchParams(searchParams);
    params.set("sale", event.target.name);
    replace(`${pathName}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center">
      <FormControlLabel
        control={
          <Checkbox
            name="true"
            checked={selected === "true"}
            onChange={handleChange}
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 28 },
              color: "#161616",
              "&.Mui-checked": {
                color: "#ed0534",
              },
            }}
          />
        }
        label={
          <Typography variant="body1" style={{ fontSize: "14px" }}>
            Sale
          </Typography>
        }
      />
      <FormControlLabel
        control={
          <Checkbox
            name=""
            checked={selected === ""}
            onChange={handleChange}
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 28 },
              color: "#161616",
              "&.Mui-checked": {
                color: "#ed0534",
              },
            }}
          />
        }
        label={
          <Typography variant="body1" style={{ fontSize: "14px" }}>
            No Sale
          </Typography>
        }
      />
    </div>
  );
};

export default FilterSaleOptions;
