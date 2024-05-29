export interface InputProps {
  type: string;
  placeholder?: string;
  extraPlaceholder?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  variation: string;
  width: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}
