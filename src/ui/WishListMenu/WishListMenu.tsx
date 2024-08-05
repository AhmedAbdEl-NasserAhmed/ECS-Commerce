"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import useClickOutside from "@/hooks/useClickOutside";

import { CartItem, WishListItemProps } from "@/types/types";
import Image from "next/image";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import Link from "next/link";
import {
  addItemThunk,
  clearCookiesThunk,
  removeItemThunk,
  setCookiesThunk,
} from "@/lib/features/cookieSlice/cookieSlice";
import useImagesLoadingSpinner from "@/hooks/useImagesLoadingSpinner";
import Spinner from "../Spinner/Spinner";
import { useTranslations } from "next-intl";
import { HiOutlineHeart } from "react-icons/hi2";
import { useState } from "react";
import { UserType } from "@/types/enums";

const WishListMenu = () => {
  const { locale } = useParams();

  const wishList = useAppSelector(
    (state) => state.cookieSlice.cookieItems.wishListItems
  );
  const user = useAppSelector((state) => state.usersSlice.user);

  const cart = useAppSelector(
    (state) => state.cookieSlice.cookieItems.cartItems
  );

  const t = useTranslations("user");

  const { isLoadingImages, setIsLoadingImages } = useImagesLoadingSpinner();

  const [isWishListOpen, setIsWishListOpen] = useState<boolean>(false);

  const ref = useClickOutside({ close: setIsWishListOpen, value: false });

  const dispatch = useAppDispatch();

  function addToCartHandler(product) {
    const isExistedInCart = cart.some((cartItem) => {
      return (
        cartItem.product === product.product &&
        cartItem.colorId === product.colorId &&
        cartItem.size === product.size
      );
    });

    if (!isExistedInCart) {
      dispatch(addItemThunk("cartItems", product));
      dispatch(
        removeItemThunk(
          "wishListItems",
          wishList.filter(
            (wistListItem) => wistListItem.colorId !== product.colorId
          )
        )
      );
      toast.success(t("This Item is Added to your  Cart"));
    } else {
      toast.error(t("This Item is Already Existed in the Cart"));
    }
  }

  function handleDeleteProduct(product) {
    dispatch(
      removeItemThunk(
        "wishListItems",
        wishList.filter(
          (wistListItem) => wistListItem.product !== product.product
        )
      )
    );
    toast.success(t("This Item is Removed from wish List"));
  }

  const removeAllCartItems = () => {
    dispatch(clearCookiesThunk("wishListItems"));
    toast.success(t("Your Wish List is Empty 🥲"));
  };

  if (user && user?.role === UserType.ADMIN) return;

  return (
    <div ref={ref} className="relative">
      <span
        onClick={() => {
          setIsWishListOpen((wishList) => !wishList);
        }}
        className="text-[2.4rem] cursor-pointer"
      >
        <HiOutlineHeart />
      </span>

      <span className="absolute w-6 h-6  rounded-full text-sm bg-red-500 -top-3 z-10 flex items-center justify-center text-white  -right-3">
        {wishList?.length}
      </span>

      {isWishListOpen && (
        <div className="w-[30rem] absolute p-4 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 end-0 flex flex-col gap-6 z-20">
          {wishList?.length === 0 ? (
            <div className="">{t("Wish List is Empty")}</div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">{t("Wish List")} </h2>
                <button
                  className="p-2 bg-red-500 text-white rounded-lg"
                  onClick={removeAllCartItems}
                >
                  {t("Clear All")}
                </button>
              </div>
              {/* LIST */}
              <div className="flex flex-col gap-8 py-2 max-h-[40rem] overflow-y-auto">
                {wishList.map((product: WishListItemProps) => {
                  return (
                    <div key={product.colorId} className="flex flex-col gap-5">
                      <div className="flex gap-4">
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
                                onClick={() => setIsWishListOpen(false)}
                                href={`/${locale}/user/product/${product.slug}`}
                                className="font-semibold capitalize"
                              >
                                {product.name}
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
                        </div>
                      </div>
                      <div className=" flex justify-between items-center">
                        <button
                          onClick={() => addToCartHandler(product)}
                          className="p-3 bg-black text-white rounded-lg"
                        >
                          {t("Add To cart")}
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product)}
                          className="text-blue-500 text-xl cursor-pointer"
                        >
                          {t("Remove")}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default WishListMenu;
