import { CustomizedTextFieldProps } from "@/types/types";
import { Box, TextField } from "@mui/material";

function CustomizedTextField({
  type,
  label,
  variant,
  textLabelClass,
  size,
  inputProps,
  error,
  helperText,
  field,
  sx,
  inputLabelProps,
  formerHelperStyles,
  textlabel,
  className,
  multiline,
  rows,
  value,
  onChange,
  placeholder,
}: CustomizedTextFieldProps) {
  if (field) {
    return (
      <Box component="div" className="flex flex-col gap-4">
        {textlabel && <label className={textLabelClass}>{textlabel}</label>}
        <TextField
          placeholder={placeholder}
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
      </Box>
    );
  } else {
    return (
      <TextField
        placeholder={placeholder}
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
