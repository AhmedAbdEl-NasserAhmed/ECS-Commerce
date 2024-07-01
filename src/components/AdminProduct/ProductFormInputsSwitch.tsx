import MultiChoiceSelectMenu from "@/ui/MultiChoiceSelectMenu/MultiChoiceSelectMenu";
import CustomizedTextField from "@/ui/TextField/TextField";

enum InputCategory {
  INPUT = "input",
  LIST = "list",
}

function ProductFormInputsSwitch({ input, field, errors }) {
  switch (input.inputType) {
    case InputCategory.INPUT:
      return (
        <CustomizedTextField
          textLabelClass={input.textLabelClass}
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
    case InputCategory.LIST:
      return (
        <MultiChoiceSelectMenu
          isMulti={input.isMulti}
          textLabelClass={input.textLabelClass}
          placeholder={input.placeholder}
          textLabel={input.textLabel}
          name={input.name}
          options={input.options}
          field={field}
          errors={errors}
        />
      );
  }
}

export default ProductFormInputsSwitch;
