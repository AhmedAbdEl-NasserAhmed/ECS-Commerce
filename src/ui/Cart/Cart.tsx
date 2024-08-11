"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import useClickOutside from "@/hooks/useClickOutside";

import { CartItem } from "@/types/types";
import Image from "next/image";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { UserType } from "@/types/enums";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  clearCookiesThunk,
  removeItemThunk,
  setCookiesThunk,
} from "@/lib/features/cookieSlice/cookieSlice";
import useImagesLoadingSpinner from "@/hooks/useImagesLoadingSpinner";
import Spinner from "../Spinner/Spinner";
import { useTranslations } from "next-intl";
import { formatCurrency } from "@/lib/helpers";

const Cart = () => {
  const { locale } = useParams();

  const router = useRouter();

  const cart = useAppSelector(
    (state) => state.cookieSlice.cookieItems.cartItems
  );

  const makePayment = useAppSelector((state) => state.paymentSlice.makePayment);

  const { isLoadingImages, setIsLoadingImages } = useImagesLoadingSpinner();

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const ref = useClickOutside({
    close: setIsCartOpen,
    value: false,
  });

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.usersSlice.user);

  const token = useAppSelector((state) => state.usersSlice.token);

  const t = useTranslations("user");
  const tMessage = useTranslations("messages");

  function handleDeleteProduct(product) {
    dispatch(
      removeItemThunk(
        "cartItems",
        cart.filter(
          (existedProductId) =>
            existedProductId.cartItemId !== product.cartItemId
        )
      )
    );
  }

  function addCartId() {
    let cartArrayCopy = [...cart];

    cartArrayCopy = cartArrayCopy.map((product) => {
      return !product.cart ? { ...product, cart: user?.cart["_id"] } : product;
    });

    dispatch(setCookiesThunk("cartItems", cartArrayCopy));
  }

  function handleIncrementProductQuantity(product) {
    let cartArrayCopy = [...cart];

    if (product.quantity !== product.maxQuantity) {
      cartArrayCopy = cartArrayCopy.map((incrementQuantityProduct) =>
        incrementQuantityProduct.cartItemId === product.cartItemId
          ? {
              ...incrementQuantityProduct,
              quantity:
                incrementQuantityProduct.maxQuantity !==
                incrementQuantityProduct.quantity
                  ? incrementQuantityProduct.quantity + 1
                  : incrementQuantityProduct.quantity,
            }
          : incrementQuantityProduct
      );
    } else {
      toast.error(tMessage("This is maximum Quantity for this product Color"));
    }

    dispatch(setCookiesThunk("cartItems", cartArrayCopy));
  }

  function handleDecrementProductQuantity(product) {
    let cartArrayCopy = [...cart];

    cartArrayCopy = cartArrayCopy.map((incrementQuantityProduct) =>
      incrementQuantityProduct.cartItemId === product.cartItemId
        ? {
            ...incrementQuantityProduct,
            quantity:
              incrementQuantityProduct.quantity !== 1
                ? incrementQuantityProduct.quantity - 1
                : incrementQuantityProduct.quantity,
          }
        : incrementQuantityProduct
    );

    dispatch(setCookiesThunk("cartItems", cartArrayCopy));
  }

  const totalCartItems = cart?.reduce((acc, cur) => {
    return acc + cur.quantity * cur.price;
  }, 0);

  const removeAllCartItems = () => {
    dispatch(clearCookiesThunk("cartItems"));
    toast.success(t("You Cart is Empty 🥲 "));
  };

  if (user && user?.role === UserType.ADMIN && !makePayment) return;

  return (
    <div ref={ref} className="relative">
      <div
        onClick={() => {
          setIsCartOpen((open) => !open);
        }}
      >
        <Image
          src="/cart.png"
          alt="cart"
          width={22}
          height={22}
          className="cursor-pointer"
        />
      </div>
      <span className="absolute w-6 h-6  rounded-full text-sm bg-red-500 -top-3 z-10 flex items-center justify-center text-white  -right-3">
        {cart?.length}
      </span>
      {isCartOpen && (
        <div className="w-[30rem] absolute p-4 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 end-0 flex flex-col gap-6 z-20">
          {cart?.length === 0 ? (
            <div className="">{t("Cart is Empty")}</div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">{t("Shopping Cart")}</h2>
                <button
                  className="p-2 bg-red-500 text-white rounded-lg"
                  onClick={removeAllCartItems}
                >
                  {t("Clear All")}
                </button>
              </div>
              {/* LIST */}
              <div className="flex flex-col gap-8 py-2 max-h-[40rem] overflow-y-auto">
                {cart.map((product: CartItem) => {
                  return (
                    <div key={product.cartItemId} className="flex gap-4">
                      {isLoadingImages && (
                        <div className="flex items-center justify-center flex-col h-full">
                          <Spinner />
                        </div>
                      )}
                      <div className="w-24 h-24 relative">
                        <Image
                          src={product.image}
                          alt=""
                          fill
                          onLoad={() => setIsLoadingImages(false)}
                          className="object-cover rounded-xl"
                        />
                      </div>

                      <div className="flex flex-col justify-between w-full">
                        {/* TOP */}
                        <div className="text-xl">
                          {/* TITLE */}
                          <div className="flex items-center justify-between gap-8">
                            <Link
                              onClick={() => setIsCartOpen(false)}
                              href={`/${locale}/user/product/${product.slug}`}
                              className="font-semibold capitalize"
                            >
                              {product.name?.[locale as string]}
                            </Link>
                            <div className="p-1 bg-gray-50 rounded-xl flex items-center gap-2">
                              <div className="text-sm font-semibold text-green-500">
                                {product.quantity} x{" "}
                              </div>

                              {product.price}
                            </div>
                          </div>
                          {/* DESC */}
                          <div className="flex justify-between  gap-4">
                            <div className="text-xl text-gray-500">
                              {t("Size")}: {product.size}
                            </div>
                            <div className=" flex items-center gap-4 text-xl  text-gray-500">
                              <span>{t("Color")}: </span>
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
                            {t("Qty")}. {product.quantity}
                          </span>

                          <div className="flex items-center gap-5">
                            <button
                              disabled={user?.role === UserType.ADMIN}
                              className={`${
                                product.quantity <= 1 ? "opacity-30" : ""
                              } w-7 h-7 bg-black rounded-full text-white flex items-center justify-center`}
                              onClick={() =>
                                handleDecrementProductQuantity(product)
                              }
                            >
                              -
                            </button>
                            <button
                              disabled={user?.role === UserType.ADMIN}
                              className={`${
                                product.quantity === product.maxQuantity
                                  ? "opacity-30"
                                  : ""
                              } w-7 h-7 bg-black rounded-full text-white flex items-center justify-center`}
                              onClick={() =>
                                handleIncrementProductQuantity(product)
                              }
                            >
                              +
                            </button>
                          </div>

                          <button
                            disabled={user?.role === UserType.ADMIN}
                            className="text-blue-500 cursor-pointer"
                            onClick={() => handleDeleteProduct(product)}
                          >
                            {t("Remove")}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* BOTTOM */}
              <div className="">
                <div className="flex items-center justify-between font-bold text-xl">
                  <span className="">{t("Total")}</span>
                  <span className="">
                    {formatCurrency(totalCartItems, locale as string)}
                  </span>
                </div>
                <p className="text-gray-500 text-xl mt-2 mb-4">
                  {t("Shipping and taxes calculated at checkout")}
                </p>
                <div className="flex justify-end  text-xl">
                  <button
                    disabled={user?.role === UserType.ADMIN}
                    onClick={() => {
                      if (token && user.isActive) {
                        setIsCartOpen(false);
                        addCartId();
                        router.push(`/${locale}/user/checkout`);
                      } else {
                        toast.error(t("Please Log in First"));
                      }
                    }}
                    className="rounded-xl py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
                  >
                    {t("Checkout")}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
