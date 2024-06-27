import { MenuItem, Select } from "@mui/material";

function SelectMenu() {
  return (
    <Select displayEmpty inputProps={{ "aria-label": "Without label" }}>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  );
}

export default SelectMenu;
