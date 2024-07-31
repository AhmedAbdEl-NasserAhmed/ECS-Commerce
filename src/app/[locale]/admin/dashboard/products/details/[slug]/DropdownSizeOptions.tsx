import styles from "./DropdownSizeOptions.module.scss";

function DropdownSizeOptions({ handleChange, data }) {
  return (
    <select onChange={handleChange} className={styles["custom-select"]}>
      {data?.map((product, index) => {
        return (
          <option
            className={styles["custom-option"]}
            key={product.size}
            value={index}
          >
            {product.size}
          </option>
        );
      })}
    </select>
  );
}

export default DropdownSizeOptions;
