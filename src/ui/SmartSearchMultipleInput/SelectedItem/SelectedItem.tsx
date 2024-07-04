import styles from "./SelectedItem.module.scss";

function SelectedItem({ item, onClick }) {
  return (
    <li key={item.name} className={styles["selected-item"]}>
      <span>{item.name}</span>
      <span className={styles["close-btn"]} onClick={onClick}>
        X
      </span>
    </li>
  );
}

export default SelectedItem;
