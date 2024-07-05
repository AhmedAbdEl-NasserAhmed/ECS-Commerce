import styles from "./GlobalFilter.module.scss";

function GlobalFilter({ filter, setFilter }) {
  return (
    <div>
      <input
        placeholder="Search here ...."
        className={styles["search-input"]}
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
}

export default GlobalFilter;
