import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

interface Props {
  value: number;
  size: "large" | "medium" | "small";
  readOnly: boolean;
  disabled: boolean;
  onChange: (value) => void;
}

export default function ReactStars({
  value,
  size,
  readOnly,
  onChange,
  disabled,
}: Partial<Props>) {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating
        disabled={disabled}
        size={size}
        name="rating-stars"
        value={value}
        readOnly={readOnly}
        onChange={onChange}
      />
    </Box>
  );
}
