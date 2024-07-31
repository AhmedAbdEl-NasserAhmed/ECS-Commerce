"use client";

import { useAppSelector } from "@/lib/hooks";
import ProductDetailsTable from "./ProductDetailsTable/ProductDetailsTable";

function Orders() {
  const cart = useAppSelector(
    (state) => state.cookieSlice.cookieItems.cartItems
  );

  const totalCartItems = cart.reduce((acc, cur) => {
    return acc + cur.quantity * cur.price;
  }, 0);

  if (!cart.length)
    return (
      <div className="p-6 bg-white shadow-md  rounded-md ">
        <p className="text-2xl font-bold">No Orders Yet</p>
      </div>
    );

  return (
    <div className="p-6 bg-white shadow-md  rounded-md flex flex-col gap-8">
      <div>
        <h2 className="text-4xl font-semibold mb-5">Your Order </h2>
        <span className="w-full h-1 block bg-[#ed0534] ">&nbsp;</span>
      </div>
      <ProductDetailsTable totalCartItems={totalCartItems} cart={cart} />
    </div>
  );
}

export default Orders;
