import { FieldError } from "react-hook-form";

export interface LoginFormData {
  loginEmail: string;
  loginPassword: string;
}

export interface CustomizedTextFieldProps {
  type: string;
  label: string;
  variant: "filled" | "outlined" | "standard";
  size: "small" | "medium";
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
}

export interface AdminDashboardLink {
  id: number;
  className: string;
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
}
