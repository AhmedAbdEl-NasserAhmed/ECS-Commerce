import { CustomizedTextFieldProps } from "@/types/types";
import { TextField } from "@mui/material";

function CustomizedTextField({
  type,
  label,
  variant,
  size,
  inputProps,
  error,
  helperText,
  field,
  sx,
  inputLabelProps,
  formerHelperStyles,
  className,
  multiline,
}: CustomizedTextFieldProps) {
  if (field) {
    return (
      <TextField
        multiline={multiline}
        {...field}
        error={error}
        className={className}
        helperText={helperText}
        type={type}
        label={label}
        variant={variant}
        size={size}
        InputProps={inputProps}
        FormHelperTextProps={formerHelperStyles}
        sx={sx}
      />
    );
  } else {
    return (
      <TextField
        sx={sx}
        InputLabelProps={inputLabelProps}
        size={size}
        label={label}
        variant={variant}
        InputProps={inputProps}
      />
    );
  }
}

export default CustomizedTextField;
