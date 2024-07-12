import styles from "./ProductDetailsTable.module.scss";

function ProductDetailsTable({ cart, totalCartItems }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>PRODUCT</th>
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
              <td>{product.quantity * product.price} EGP</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td>TOTAL</td>
          <td>{totalCartItems} EGP</td>
        </tr>
      </tfoot>
    </table>
  );
}

export default ProductDetailsTable;
