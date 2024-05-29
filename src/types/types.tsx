export interface InputProps {
  type: string;
  placeholder?: string;
  extraPlaceholder?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  variation: string;
  icon?: React.ReactNode;
}
