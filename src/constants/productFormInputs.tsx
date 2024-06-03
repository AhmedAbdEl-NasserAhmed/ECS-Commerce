import { CustomizedTextFieldProps } from "@/types/types";

export const productFormInputs: CustomizedTextFieldProps[] = [
  {
    id: "1",
    name: "productName",
    defaultValue: "",
    rules: {
      required: "This field is required",
    },
    formerHelperStyles: { style: { fontSize: "1rem" } },
    type: "text",
    label: "Product Name",
    variant: "outlined",
    size: "small",
    sx: {
      input: {
        fontSize: "1.4rem",
      },

      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "rgb(6 182 212)",
          borderRadius: "5px",
          borderWidth: "2px",
        },
        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgb(186, 9, 9)",
        },

        "&:hover fieldset": {
          borderColor: "rgb(6 182 212)",
        },

        "&.Mui-focused fieldset": {
          borderColor: "rgb(6 182 212)",
        },
      },
    },
  },
  {
    id: "2",
    name: "productCategory",
    defaultValue: "",
    rules: {
      required: "This field is required",
    },
    formerHelperStyles: { style: { fontSize: "1rem" } },
    type: "text",
    label: "Product Category",
    variant: "outlined",
    size: "small",
    sx: {
      input: {
        fontSize: "1.4rem",
      },

      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "rgb(6 182 212)",
          borderRadius: "5px",
          borderWidth: "2px",
        },
        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgb(186, 9, 9)",
        },

        "&:hover fieldset": {
          borderColor: "rgb(6 182 212)",
        },

        "&.Mui-focused fieldset": {
          borderColor: "rgb(6 182 212)",
        },
      },
    },
  },
  {
    id: "3",
    name: "productQuantity",
    defaultValue: "",
    rules: {
      required: "This field is required",
    },
    formerHelperStyles: { style: { fontSize: "1rem" } },
    type: "number",
    label: "Product Quantity",
    variant: "outlined",
    size: "small",
    sx: {
      input: {
        fontSize: "1.4rem",
      },

      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "rgb(6 182 212)",
          borderRadius: "5px",
          borderWidth: "2px",
        },
        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgb(186, 9, 9)",
        },

        "&:hover fieldset": {
          borderColor: "rgb(6 182 212)",
        },

        "&.Mui-focused fieldset": {
          borderColor: "rgb(6 182 212)",
        },
      },
    },
  },
  {
    id: "4",
    name: "productPrice",
    defaultValue: "",
    rules: {
      required: "This field is required",
    },
    formerHelperStyles: { style: { fontSize: "1rem" } },
    type: "number",
    label: "Product Price",
    variant: "outlined",
    size: "small",
    sx: {
      input: {
        fontSize: "1.4rem",
      },

      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "rgb(6 182 212)",
          borderRadius: "5px",
          borderWidth: "2px",
        },
        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgb(186, 9, 9)",
        },

        "&:hover fieldset": {
          borderColor: "rgb(6 182 212)",
        },

        "&.Mui-focused fieldset": {
          borderColor: "rgb(6 182 212)",
        },
      },
    },
  },
  {
    id: "5",
    name: "productDescription",
    defaultValue: "",
    rules: {
      required: "This field is required",
    },
    formerHelperStyles: { style: { fontSize: "1rem" } },
    type: "text",
    label: "Product Description",
    variant: "outlined",
    size: "small",
    multiline: true,
    row: 4,
    sx: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "rgb(6 182 212)",
          borderRadius: "5px",
          borderWidth: "2px",
        },
        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgb(186, 9, 9)", // Customize the border color on error here
        },

        "&:hover fieldset": {
          borderColor: "rgb(6 182 212)",
        },

        "&.Mui-focused fieldset": {
          borderColor: "rgb(6 182 212)",
        },
      },
      "& .MuiInputBase-input": {
        fontSize: "1.4rem", // Customize the font size here
      },
    },
  },
];

export default productFormInputs;
