import { TextField } from "@mui/material";

interface CustomizedTextFieldProps {
  type: string;
  width: string;
  label: string;
  variant: "filled" | "outlined" | "standard";
  size: "small" | "medium";
  field: object;
  inputProps?: object;
  borderColor?: string;
  error?: boolean;
  helperText?: string;
}

function CustomizedTextField({
  borderColor = "rgb(6 182 212)",
  type,
  width,
  label,
  variant,
  size,
  inputProps,
  error,
  helperText,
  field,
}: CustomizedTextFieldProps) {
  return (
    <TextField
      {...field}
      error={error}
      helperText={helperText}
      type={type}
      label={label}
      variant={variant}
      size={size}
      InputProps={inputProps}
      FormHelperTextProps={{ style: { fontSize: "1.2rem" } }}
      sx={{
        helperText: {
          fontSize: "4rem",
        },
        input: {
          fontSize: "1.4rem",
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
