import { TextField } from "@mui/material";

interface CustomizedTextFieldProps {
  name: string;
  type: string;
  width: string;
  label: string;
  variant: "filled" | "outlined" | "standard";
  size: "small" | "medium";
  inputProps?: object;
  borderColor?: string;
}

function CustomizedTextField({
  borderColor = "rgb(6 182 212)",
  name,
  type,
  width,
  label,
  variant,
  size,
  inputProps,
}: CustomizedTextFieldProps) {
  return (
    <TextField
      name={name}
      type={type}
      label={label}
      variant={variant}
      size={size}
      InputProps={inputProps}
      sx={{
        input: {
          fontSize: "1.3rem",
        },

        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor,
            borderRadius: "5px",
            borderWidth: "2px",
          },

          "&:hover fieldset": {
            borderColor,
          },

          "&.Mui-focused fieldset": {
            borderColor,
          },
        },
        width: width,
      }}
    />
  );
}

export default CustomizedTextField;
