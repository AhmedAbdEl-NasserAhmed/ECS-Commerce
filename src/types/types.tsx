export interface LoginFormData {
  loginEmail: string;
  loginPassword: string;
}

export interface CustomizedTextFieldProps {
  type: string;
  width: string;
  label: string;
  variant: "filled" | "outlined" | "standard";
  size: "small" | "medium";
  field: object;
  inputProps?: object;
  borderColor?: string;
  error?: boolean;
  helperText?: string;
}

export interface AdminDashboardLink {
  id: number;
  className: string;
  icon: React.ReactNode;
  headLine: string;
  href: string;
}
