import { Slider } from "@mui/material";

function valuetext(value: number) {
  return `${value}EGP`;
}

function RangeSlider({ value, handleChange }) {
  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-semibold capitalize">Price</h2>
      <div className="text-lg flex items-center justify-between font-semibold gap-4">
        <span>
          {value[0]} {""}EGP
        </span>
        <span>
          {value[1]} {""}EGP
        </span>
      </div>
      <Slider
        sx={{ color: "red", width: "95%", margin: "auto" }}
        min={1}
        max={5000}
        getAriaLabel={() => "Price range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="off"
        getAriaValueText={valuetext}
      />
    </div>
  );
}

export default RangeSlider;
