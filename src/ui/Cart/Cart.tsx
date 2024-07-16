"use client";

import {
  decrementProductItem,
  incrementProductItem,
  removeItem,
  assignCartId,
} from "@/lib/features/cartSlice/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import useClickOutside from "@/hooks/useClickOutside";

import { CartItem } from "@/types/types";
import Image from "next/image";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const Cart = ({ setIsCartOpen }) => {
  const { locale } = useParams();

  const router = useRouter();

  const cart = useAppSelector((state) => state.cartSlice.cartItems);

  const ref = useClickOutside({ close: setIsCartOpen, value: false });

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.usersSlice.user);

  const token = useAppSelector((state) => state.usersSlice.token);

  let date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
  let expires = date.toUTCString();

  useEffect(() => {
    document.cookie = `cartItems=${JSON.stringify(cart)}; expires=${expires};`;
  }, [cart, expires]);

  function handleDeleteProduct(color) {
    dispatch(removeItem(color));
  }

  function addCartId() {
    dispatch(assignCartId(user.cart["_id"]));
  }

  function handleIncrementProductQuantity(product) {
    if (product.quantity !== product.maxQuantity) {
      dispatch(
        incrementProductItem({
          id: product.id,
          maxQuantity: product.maxQuantity,
        })
      );
    } else {
      toast.error(" This is maximum Quantity for this product Color");
    }
  }

  function handleDecrementProductQuantity(product) {
    dispatch(decrementProductItem(product.id));
  }

  const totalCartItems = cart.reduce((acc, cur) => {
    return acc + cur.quantity * cur.price;
  }, 0);

  return (
    <div
      ref={ref}
      className="w-max absolute p-4 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20"
    >
      {cart.length === 0 ? (
        <div className="">Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold">Shopping Cart</h2>
          {/* LIST */}
          <div className="flex flex-col gap-8">
            {cart.map((product: CartItem) => {
              return (
                <div key={product.cartItemId} className="flex gap-4">
                  {true && (
                    <Image
                      src={product.image}
                      alt=""
                      width={72}
                      height={96}
                      className="object-cover rounded-xl"
                    />
                  )}
                  <div className="flex flex-col justify-between w-full">
                    {/* TOP */}
                    <div className="text-xl">
                      {/* TITLE */}
                      <div className="flex items-center justify-between gap-8">
                        <h3 className="font-semibold capitalize">
                          {product.name}
                        </h3>
                        <div className="p-1 bg-gray-50 rounded-xl flex items-center gap-2">
                          {true && (
                            <div className="text-sm font-semibold text-green-500">
                              {product.quantity} x{" "}
                            </div>
                          )}
                          {product.price}
                        </div>
                      </div>
                      {/* DESC */}
                      <div className="flex justify-between  gap-4">
                        <div className="text-xl text-gray-500">
                          Size: {product.size}
                        </div>
                        <div className=" flex items-center gap-4 text-xl  text-gray-500">
                          <span>Color: </span>
                          <span
                            className=" w-5 h-5 rounded-full"
                            style={{ backgroundColor: product.color }}
                          >
                            &nbsp;
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* BOTTOM */}
                    <div className="flex justify-between items-center text-xl">
                      <span className="text-gray-500">
                        Qty. {product.quantity}
                      </span>

                      <div className="flex items-center gap-5">
                        <button
                          className={` ${
                            product.quantity === product.maxQuantity
                              ? "bg-red-500"
                              : ""
                          } w-7 h-7 bg-black rounded-full text-white flex items-center justify-center`}
                          onClick={() =>
                            handleIncrementProductQuantity(product)
                          }
                        >
                          +
                        </button>
                        <button
                          className="w-7 h-7 bg-black rounded-full text-white flex items-center justify-center"
                          onClick={() =>
                            handleDecrementProductQuantity(product)
                          }
                        >
                          -
                        </button>
                      </div>

                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleDeleteProduct(product.cartItemId)}
                      >
                        Remove
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BOTTOM */}
          <div className="">
            <div className="flex items-center justify-between font-bold text-xl">
              <span className="">Total</span>
              <span className="">{totalCartItems} EGP</span>
            </div>
            <p className="text-gray-500 text-xl mt-2 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-end  text-xl">
              <button
                onClick={() => {
                  if (token) {
                    setIsCartOpen(false);
                    addCartId();
                    router.push(`/${locale}/user/checkout`);
                  } else {
                    toast.error("Please Log in First");
                  }
                }}
                className="rounded-xl py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
