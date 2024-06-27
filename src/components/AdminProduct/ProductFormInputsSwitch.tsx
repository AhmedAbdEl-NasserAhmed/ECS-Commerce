import CustomizedTextField from "@/ui/TextField/TextField";
import { Box, FormHelperText, MenuItem, Select } from "@mui/material";

function ProductFormInputsSwitch({ input, field, errors }) {
  switch (input.inputType) {
    case "input":
      return (
        <CustomizedTextField
          placeholder={input.placeholder}
          textlabel={input.textlabel}
          multiline={input.multiline}
          rows={input.row}
          field={field}
          error={!!errors[input.name]}
          formerHelperStyles={input.formerHelperStyles}
          helperText={errors[input.name] ? errors[input.name].message : ""}
          type={input.type}
          label={input.label}
          variant={input.variant}
          size={input.size}
          sx={input.sx}
        />
      );
    case "list":
      return (
        <Box component="div" className="flex flex-col gap-4">
          <label className=" font-semibold text-xl">{input.placeholder}</label>
          <Select className="w-full" {...field} sx={input.sx}>
            {input.selectOptions.map(
              (option: { value: string; label: string }) => (
                <MenuItem
                  sx={{
                    fontSize: "1rem", // Adjust font size of each option
                  }}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              )
            )}
          </Select>
          {errors[input.name] && (
            <FormHelperText>{errors[input.name]?.message}</FormHelperText>
          )}
        </Box>
      );
  }
}

export default ProductFormInputsSwitch;
