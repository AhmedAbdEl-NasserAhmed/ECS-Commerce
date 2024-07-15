import { Slider } from "@mui/material";

function valuetext(value: number) {
  return `${value}EGP`;
}

function RangeSlider({ value, handleChange }) {
  return (
    <Slider
      sx={{ color: "red" }}
      min={0}
      max={2000}
      getAriaLabel={() => "Price range"}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="on"
      getAriaValueText={valuetext}
    />
  );
}

export default RangeSlider;
