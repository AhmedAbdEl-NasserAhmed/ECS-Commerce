import styles from "./SelectedItem.module.scss";

function SelectedItem({ lang = "", item, onClick, disabled }) {
  return (
    <li
      key={item.name[lang]}
      className={`${styles["selected-item"]} ${
        disabled ? "opacity-30" : "opacity-100"
      }`}
    >
      <span>{item.name[lang]}</span>
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
