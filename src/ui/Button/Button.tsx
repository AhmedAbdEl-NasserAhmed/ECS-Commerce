import styles from "./Button.module.scss";

import { ButtonProps } from "@/types/types";

function Button({ variation, children, icon }: ButtonProps) {
  return (
    <button
      style={{ backgroundColor: variation }}
      className={`${styles.btn}  `}
    >
      <span>{children}</span>
      {icon && <span>{icon}</span>}
    </button>
  );
}

export default Button;
