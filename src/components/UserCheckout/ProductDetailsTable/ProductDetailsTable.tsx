import styles from "./ProductDetailsTable.module.scss";

function ProductDetailsTable({ cart, totalCartItems }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>PRODUCT</th>
          <th>Size</th>
          <th>Color</th>
          <th>TOTAL</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((product) => {
          return (
            <tr key={product.id}>
              <td>
                {" "}
                {product.name} * {product.quantity}
              </td>
              <td>{product.size}</td>
              <td>
                <span
                  className="w-5 h-5 inline-block rounded-full"
                  style={{ backgroundColor: product.color }}
                ></span>
              </td>
              <td>{product.quantity * product.price} EGP</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td>TOTAL</td>
          <td></td>
          <td></td>
          <td>{totalCartItems} EGP</td>
        </tr>
      </tfoot>
    </table>
  );
}

export default ProductDetailsTable;
