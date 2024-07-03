import { FieldPath } from "react-hook-form";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AdminMainCategory {
  name: string;
  description: string;
}

export interface AdminSubCategory {
  name: string;
  description: string;
  category: string;
}
export interface AdminProductProps {
  productName: string;
  productCategory: string;
  productQuantity: number;
  productPrice: number;
  productMainCategory: string;
  productSalePrice: number;
  productSubCategory: string;
  productDiscount: number;
  productType: string;
  productColors: {
    value: string;
    label: string;
    color: string;
  }[];
  productSizes: {
    value: string;
    label: string;
    color: string;
  }[];
  productDescription: string;
}

export interface CustomizedTextFieldProps {
  type?: string;
  name?: FieldPath<AdminProductProps>;
  label?: string;
  variant?: "filled" | "outlined" | "standard";
  size?: "small" | "medium";
  rules?: object;
  id?: string;
  defaultValue?: string | ColourOption[] | SizesOption[];
  field?: object;
  inputProps?: object;
  borderColor?: string;
  error?: boolean;
  helperText?: string;
  sx?: object;
  inputLabelProps?: object;
  formerHelperStyles?: object;
  className?: string;
  multiline?: boolean;
  rows?: number;
  value?: React.ReactNode;
  onChange?: () => void;
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
}
