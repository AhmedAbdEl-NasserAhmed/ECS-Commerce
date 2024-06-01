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
}

export interface AdminDashboardLink {
  id: number;
  className: string;
  icon: React.ReactNode;
  headLine: string;
  href: string;
}

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const colourOptions: readonly ColourOption[] = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC" },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

export interface ProductFormInputs {
  productName: string;
  productCategory: string;
  productQuantity: string;
  productColors: {
    value: string;
    label: string;
    color: string;
  }[];
}

export interface SelecteMenuProps {
  field: object;
  className: string;
  hasError: boolean;
}
