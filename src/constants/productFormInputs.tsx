import { CustomizedTextFieldProps } from "@/types/types";

// : CustomizedTextFieldProps[] =

export const productFormInputs = (
  formData: object
): CustomizedTextFieldProps[] => {
  console.log(formData);

  return [
    {
      id: "1",
      name: "productName",
      inputType: "input",
      textlabel: "Product Name",
      textLabelClass: "font-semibold text-xl",
      defaultValue: "",
      placeholder: "Product Name",

      rules: {
        required: "This field is required",
      },
      formerHelperStyles: { style: { fontSize: "1rem" } },
      type: "text",
      variant: "outlined",
      size: "small",
      sx: {
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
            fontSize: "1.5rem",
            color: "#383737",

            "&::placeholder": {
              color: "#939393",
              fontSize: "1.5rem",
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
      },
    },
    {
      id: "2",
      name: "productColors",
      textLabel: "Product Colors",
      isMulti: true,
      textLabelClass: "font-semibold text-xl",
      rules: {
        required: "This field is required",
      },
      inputType: "list",
      placeholder: "Product Colors",
      options: [
        { value: "ocean", label: "Ocean", color: "#666666" },
        { value: "blue", label: "Blue", color: "#0052CC" },
        { value: "purple", label: "Purple", color: "#5243AA" },
        { value: "red", label: "Red", color: "#FF5630" },
        { value: "orange", label: "Orange", color: "#FF8B00" },
        { value: "yellow", label: "Yellow", color: "#FFC400" },
        { value: "green", label: "Green", color: "#36B37E" },
        { value: "forest", label: "Forest", color: "#00875A" },
        { value: "slate", label: "Slate", color: "#253858" },
        { value: "silver", label: "Silver", color: "#666666" },
      ],
    },
    {
      id: "3",
      name: "productSizes",
      textLabel: "Product Sizes",
      isMulti: false,
      textLabelClass: "font-semibold text-xl",
      rules: {
        required: "This field is required",
      },
      inputType: "list",
      placeholder: "Product Sizes",
      options: [
        { value: "XS", label: "xs", color: "#666666" },
        { value: "SM", label: "sm", color: "#666666" },
        { value: "L", label: "L", color: "#666666" },
        { value: "Xl", label: "Xl", color: "#666666" },
        { value: "XXl", label: "XXl", color: "#666666" },
        { value: "XXXl", label: "XXXl", color: "#666666" },
      ],
    },
    {
      id: "4",
      name: "productPrice",
      textLabelClass: "font-semibold text-xl",
      inputType: "input",
      textlabel: "Product Price",
      defaultValue: "",
      placeholder: "Product Price",

      rules: {
        required: "This field is required",
      },
      formerHelperStyles: { style: { fontSize: "1rem" } },
      type: "number",
      variant: "outlined",
      size: "small",
      sx: {
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
            fontSize: "1.5rem",
            color: "#383737",

            "&::placeholder": {
              color: "#939393",
              fontSize: "1.5rem",
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
      },
    },
    {
      id: "5",
      name: "productDiscount",
      textLabelClass: "font-semibold text-xl",
      inputType: "input",
      textlabel: "Product Discount",
      defaultValue: "",
      placeholder: "Product Discount",
      rules: {
        required: "This field is required",
      },
      formerHelperStyles: { style: { fontSize: "1rem" } },
      type: "number",
      variant: "outlined",
      size: "small",
      sx: {
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
            fontSize: "1.5rem",
            color: "#383737",

            "&::placeholder": {
              color: "#939393",
              fontSize: "1.5rem",
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
      },
    },
    {
      id: "6",
      name: "productDescription",
      textLabelClass: "font-semibold text-xl",
      inputType: "input",
      textlabel: "Product Description",
      defaultValue: "",
      placeholder: "Product Description",
      className: "col-span-full",
      rules: {
        required: "This field is required",
      },
      formerHelperStyles: { style: { fontSize: "1rem" } },
      type: "text",

      size: "small",
      multiline: true,
      row: 4,
      sx: {
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
            paddingInline: "0.8rem",
            fontSize: "1.5rem",
            color: "#383737",

            "&::placeholder": {
              color: "#939393",
              fontSize: "1.5rem",
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
      },
    },
  ];
};

export default productFormInputs;
