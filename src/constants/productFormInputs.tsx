import { CustomizedTextFieldProps } from "@/types/types";

export const productFormInputs: Partial<CustomizedTextFieldProps[]> = [
  {
    id: "1",
    name: "productName",
    inputType: "input",
    textlabel: "Product Name",
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
    name: "productType",
    defaultValue: "T-shirt",
    inputType: "list",
    placeholder: "Product Type",

    selectOptions: [
      { value: "T-shirt", label: "T-shirt" },
      { value: "Dress", label: "Dress" },
      { value: "Table", label: "Table" },
      { value: "Sofa", label: "Sofa" },
    ],

    sx: {
      height: "4rem",
      borderRadius: "40px",
      fontSize: "1.2rem",
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#e7e7e7",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#e7e7e7",
      },
      "& .MuiSelect-select": {
        // Targeting internal elements
        display: "flex",
        fontSize: "1.2rem",
        borderRadius: "40px",
        alignItems: "center",
      },
    },
  },

  {
    id: "3",
    name: "productMainCategory",
    defaultValue: "shirt",
    inputType: "list",
    placeholder: "Main Category",

    selectOptions: [
      { value: "shirt", label: "shirt" },
      { value: "Dress", label: "Dress" },
      { value: "Table", label: "Table" },
      { value: "Sofa", label: "Sofa" },
    ],

    sx: {
      height: "4rem",
      borderRadius: "40px",
      fontSize: "1.2rem",
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#e7e7e7",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#e7e7e7",
      },
      "& .MuiSelect-select": {
        // Targeting internal elements
        display: "flex",
        fontSize: "1.2rem",
        borderRadius: "40px",
        alignItems: "center",
      },
    },
  },

  {
    id: "4",
    name: "productSubCategory",
    defaultValue: "Men Shirt",
    inputType: "list",
    placeholder: "Sub Category",

    selectOptions: [
      { value: "Men Shirt", label: "Men Shirt" },
      { value: "Dress", label: "Dress" },
      { value: "Table", label: "Table" },
      { value: "Sofa", label: "Sofa" },
    ],

    sx: {
      height: "4rem",
      borderRadius: "40px",
      fontSize: "1.2rem",
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#e7e7e7",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#e7e7e7",
      },
      "& .MuiSelect-select": {
        // Targeting internal elements
        display: "flex",
        fontSize: "1.2rem",
        borderRadius: "40px",
        alignItems: "center",
      },
    },
  },
  {
    id: "5",
    name: "productPrice",
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
    id: "6",
    name: "productDiscount",
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
    id: "7",
    name: "productDescription",
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

export default productFormInputs;
