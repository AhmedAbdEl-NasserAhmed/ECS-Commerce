import { useParams } from "next/navigation";
import styles from "./ProductDetailsTable.module.scss";
import { formatCurrency } from "@/lib/helpers";

function ProductDetailsTable({
  userTranslation,
  cart,
  totalCartItems,
  enteredPromocode,
}) {
  const { locale } = useParams();

  const hasPromocode = !!enteredPromocode;
  const expirationDate = hasPromocode
    ? new Date(enteredPromocode.expirationDate.slice(0, 10))
    : new Date();
  const isPromocodeExpired = new Date() >= expirationDate;
  let discountAmount = (totalCartItems * enteredPromocode?.discount) / 100;
  const total =
    enteredPromocode && !isPromocodeExpired
      ? formatCurrency(totalCartItems - discountAmount)
      : formatCurrency(totalCartItems, locale as string);
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
                {formatCurrency(
                  product.quantity * product.price,
                  locale as string
                )}
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
            {hasPromocode && !isPromocodeExpired && (
              <span>
                <span className="line-through text-gray-300">
                  {formatCurrency(totalCartItems, locale as string)}
                </span>{" "}
                -{" "}
              </span>
            )}
            <span
              className={`${
                hasPromocode && !isPromocodeExpired ? "text-[#27ae60]" : ""
              }`}
            >
              {total}
            </span>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default ProductDetailsTable;
