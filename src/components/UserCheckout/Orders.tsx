"use client";

import { useAppSelector } from "@/lib/hooks";
import ProductDetailsTable from "./ProductDetailsTable/ProductDetailsTable";
import { useTranslations } from "next-intl";

function Orders(props) {
  const cart = useAppSelector(
    (state) => state.cookieSlice.cookieItems.cartItems
  );

  const userTranslation = useTranslations("user");

  const totalCartItems = cart.reduce((acc, cur) => {
    return acc + cur.quantity * cur.price;
  }, 0);

  if (!cart.length)
    return (
      <div className="p-6 bg-white shadow-md  rounded-md ">
        <p className="text-2xl font-bold">{userTranslation("No Orders Yet")}</p>
      </div>
    );

  return (
    <div className="p-6 bg-white shadow-md  rounded-md flex flex-col gap-8">
      <div>
        <h2 className="text-4xl font-semibold mb-5">
          {userTranslation("Your Order")}{" "}
        </h2>
        <span className="w-full h-1 block bg-[#ed0534] ">&nbsp;</span>
      </div>
      <ProductDetailsTable
        userTranslation={userTranslation}
        totalCartItems={totalCartItems}
        cart={cart}
        enteredPromocode={props.enteredPromocode}
      />
    </div>
  );
}

export default Orders;
