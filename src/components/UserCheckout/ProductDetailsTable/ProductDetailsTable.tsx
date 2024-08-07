import { useParams } from "next/navigation";
import styles from "./ProductDetailsTable.module.scss";

function ProductDetailsTable({ userTranslation, cart, totalCartItems }) {
  const { locale } = useParams();

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>{userTranslation("Product Name")}</th>
          <th>{userTranslation("Quantity")}</th>
          <th>{userTranslation("Size")}</th>
          <th>{userTranslation("Color")}</th>
          <th>{userTranslation("Total")}</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((product) => {
          return (
            <tr key={product.cartItemId}>
              <td>{product.name?.[locale as string]}</td>
              <td> {product.quantity}</td>
              <td>{product.size}</td>
              <td>
                <span
                  className="w-5 h-5 inline-block rounded-full"
                  style={{ backgroundColor: product.color }}
                ></span>
              </td>
              <td>
                {product.quantity * product.price} {userTranslation("EGP")}
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td>{userTranslation("Total")}</td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            {" "}
            {Math.ceil(totalCartItems)} {userTranslation("EGP")}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default ProductDetailsTable;
