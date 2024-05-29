import styles from "./Button.module.scss";

import { ButtonProps } from "@/types/types";

function Button({ variation, children, icon, width, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: variation, width: width }}
      className={`${styles.btn}  `}
    >
      <span>{children}</span>
      {icon && <span>{icon}</span>}
    </button>
  );
}

export default Button;
