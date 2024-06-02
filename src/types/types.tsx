import { FieldPath } from "react-hook-form";

export interface LoginFormData {
  loginEmail: string;
  loginPassword: string;
}

interface Name {
  productName: string;
  productCategory: string;
  productQuantity: string;
  productDescription: string;
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
}

export interface CustomizedTextFieldProps {
  type?: string;
  name?: FieldPath<Name>;
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
}

export interface AdminDashboardLink {
  id: number;
  icon: React.ReactNode;
  headLine: string;
  href: string;
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

export interface ProductFormInputs {
  productName: string;
  productCategory: string;
  productQuantity: string;
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

export interface SelecteMenuProps {
  field: object;
  className?: string;
  hasError: boolean;
  placeholder: string;
  options: ColourOption[] | SizesOption[];
  errors: object;
  name: string;
}
