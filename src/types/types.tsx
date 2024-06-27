import { FieldPath } from "react-hook-form";

export interface LoginFormData {
  loginEmail: string;
  loginPassword: string;
}

export interface AdminProductProps {
  productName: string;
  productCategory: string;
  productQuantity: number;
  productPrice: number;
  productMainCategory: string;
  productSubCategory: string;
  productDiscount: string;
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
  productImage: string;
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
  options?: ColourOption[];
  textlabel?: string;
  inputType?: string;
  selectOptions?: {
    value: string;
    label: string;
  }[];
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
  hasError: boolean;
  placeholder: string;
  options: ColourOption[] | SizesOption[];
  errors: object;
  name: string;
}
