import { CustomizedTextFieldProps } from "@/types/types";
import { Box, TextField } from "@mui/material";

function CustomizedTextField({
  type,
  label,
  name,
  variant,
  textLabelClass,
  size,
  inputProps,
  errors,
  field,
  disabled,
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
}: Partial<CustomizedTextFieldProps>) {
  if (field) {
    return (
      <Box className="flex flex-col gap-4 ">
        {textlabel && <label className={textLabelClass}>{textlabel}</label>}
        <TextField
          disabled={disabled}
          placeholder={placeholder}
          multiline={multiline}
          error={!!errors?.[field.name]}
          helperText={errors?.[field.name]?.message || ""}
          rows={rows}
          className={className}
          type={type}
          label={label}
          variant={variant}
          size={size}
          InputProps={inputProps}
          FormHelperTextProps={formerHelperStyles}
          sx={{
            helperText: {
              fontSize: "4rem",
            },
            input: {
              fontSize: "1.4rem",
            },

            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "10px",
                borderColor: "#dcdbdb",
                backgroundColor: "#ffffff52",
              },

              "& .MuiInputBase-input": {
                backgroundColor: "none",
                paddingBlock: "1rem",
                paddingInline: "1.8rem",
                color: "#383737",

                "&::placeholder": {
                  color: "#939393",
                  fontSize: "1.2rem",
                  opacity: 1,
                },
              },

              "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(186, 9, 9)", // Customize the border color on error here
              },

              "&:hover fieldset": {
                borderColor: "#dcdbdb",
              },

              "&.Mui-focused fieldset": {
                borderColor: "#dcdbdb",
              },
            },
            ...sx,
          }}
          {...field}
        />
      </Box>
    );
  } else {
    return (
      <TextField
        error={!!errors?.[name]}
        helperText={errors?.[name]?.message || ""}
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
