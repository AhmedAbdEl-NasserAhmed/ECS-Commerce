import { CustomizedTextFieldProps } from "@/types/types";
import { colourOptions } from "./colorOptions";
import { sizesOptions } from "./sizesOptions";

const productFormInputsSelectMenus: CustomizedTextFieldProps[] = [
  {
    id: "1",
    name: "productColors",
    defaultValue: [],
    rules: {
      required: "This field is required",
    },
    variant: "outlined",
    placeholder: "Product Colors",
    options: colourOptions,
  },
  {
    id: "2",
    name: "productSizes",
    defaultValue: [],
    rules: {
      required: "This field is required",
    },
    variant: "outlined",
    placeholder: "Product Sizes",
    options: sizesOptions,
  },
];

export default productFormInputsSelectMenus;
