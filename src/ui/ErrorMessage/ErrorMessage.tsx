import styles from "./ErrorMessage.module.scss";

interface Props {
  message: React.ReactNode;
}

function ErrorMessage({ message }: Props) {
  return <p className={styles.error}>{message}</p>;
}

export default ErrorMessage;
