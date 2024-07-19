import { FieldPath } from "react-hook-form";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AdminMainCategory {
  name: string;
  description: string;
}

export interface UserReviewForm {
  review: string;
  stars: string;
}

export interface AdminSubCategory {
  name: string;
  description: string;
  category: string;
}

export type extraKey = { [key: string]: string };
export interface AdminProductProps {
  name: string;
  quantity: number;
  price: number;
  salePrice: number;
  subCategory: string[] | string;
  discount: number;
  category: string;
  description: string;
  colors: {
    value: string;
    label: string;
    color: string;
    quantity: number;
  }[];
  size:
    | {
        value: string;
        label: string;
        color: string;
      }[]
    | string;
  images: {
    [key: string]: File;
  };
  saleProduct?: number;
  [key: string]: any;
}

export interface CustomizedTextFieldProps {
  type?: string;
  name: FieldPath<AdminProductProps>;
  label?: string;
  variant?: "filled" | "outlined" | "standard";
  size?: "small" | "medium";
  rules?: object;
  id?: string;
  defaultValue?: string | ColourOption[] | SizesOption[];
  field?: { name: string };
  inputProps?: object;
  borderColor?: string;
  error?: boolean;
  helperText?: string;
  sx?: object;
  inputLabelProps?: object;
  formerHelperStyles?: object;
  className?: string;
  mainContainerSx?: object;
  multiline?: boolean;
  rows?: number;
  value?: React.ReactNode;
  onChange?: (value) => void;
  row?: number;
  placeholder?: string;
  options?: ColourOption[] | SizesOption[];
  textlabel?: string;
  inputType?: string;
  selectOptions?: {
    value: string;
    label: string;
  }[];
  textLabel?: string;
  textLabelClass?: string;
  isMulti?: boolean;
  disabled?: boolean;
  errors: object;
  customError?: any;
}

export interface AdminDashboardLink {
  id: number;
  icon: React.ReactNode;
  headLine: string;
  href: string;
  pathName?: string;
}

export interface ColourOption {
  value: string;
  label: string;
  color: string;
  quantity?: number;
}

export interface SizesOption {
  value: string;
  label: string;
  color: string;
}

export interface SelecteMenuProps {
  field: object;
  className?: string;
  placeholder: string;
  options: ColourOption[] | SizesOption[];
  errors: object;
  name: string;
  textLabel: string;
  textLabelClass: string;
  isMulti: boolean;
  disabled: boolean;
  colorsPicker?: boolean;
  readOnly?: boolean;
}
export interface BaseColorPickerProps {
  field: any;
  className?: string;
  placeholder: string;
  errors: object;
  name: string;
  textLabel: string;
  textLabelClass: string;
  isMulti: boolean;
  disabled: boolean;
  onChange: (v) => void;
  existedColors: {
    value: string;
    label: string;
    color: string;
  }[];
}

export interface CartItem {
  id: string;
  name: string;
  size: string;
  quantity: number;
  image: string;
  color: string;
  price: number;
  maxQuantity: number;
  cartItemId: string;
  colorId: string;
}
