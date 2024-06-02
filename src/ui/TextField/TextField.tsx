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
  rows,
  value,
  onChange,
}: CustomizedTextFieldProps) {
  if (field) {
    return (
      <TextField
        multiline={multiline}
        error={error}
        rows={rows}
        className={className}
        helperText={helperText}
        type={type}
        label={label}
        variant={variant}
        size={size}
        InputProps={inputProps}
        FormHelperTextProps={formerHelperStyles}
        sx={sx}
        {...field}
      />
    );
  } else {
    return (
      <TextField
        className={className}
        onChange={onChange}
        value={value}
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
