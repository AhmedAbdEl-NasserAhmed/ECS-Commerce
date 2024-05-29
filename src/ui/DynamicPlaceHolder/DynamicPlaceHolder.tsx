import styles from "./DynamicPlaceHolder.module.scss";

interface Props {
  extraPlaceholder: string;
  className: string;
}

function DynamicPlaceHolder({ extraPlaceholder, className }: Props) {
  return (
    <span className={`${styles["placeholder"]} ${className} `}>
      {extraPlaceholder}
    </span>
  );
}

export default DynamicPlaceHolder;
