import styles from "./ErrorMessage.module.scss";

function ErrorMessage({ message }) {
  return <p className={styles.error}>{message || ""}</p>;
}

export default ErrorMessage;
