import styles from "./SelectedItem.module.scss";

function SelectedItem({ item, onClick, disabled }) {
  return (
    <li
      key={item.name}
      className={`${styles["selected-item"]} ${
        disabled ? "opacity-30" : "opacity-100"
      }`}
    >
      <span>{item.name}</span>
      <span
        className={`${styles["close-btn"]} ${
          disabled ? "opacity-30" : "opacity-100"
        }`}
        onClick={onClick}
      >
        X
      </span>
    </li>
  );
}

export default SelectedItem;
