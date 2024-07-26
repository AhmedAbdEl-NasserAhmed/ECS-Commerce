"use client";

import {
  addItemThunk,
  clearCookiesThunk,
  removeItemThunk,
} from "@/lib/features/cookieSlice/cookieSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { WishListItemProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  wishListItem: WishListItemProps;
}

function WishListItem({ wishListItem }: Props) {
  const { locale } = useParams();

  const cart = useAppSelector(
    (state) => state.cookieSlice.cookieItems.cartItems
  );

  const wishList = useAppSelector(
    (state) => state.cookieSlice.cookieItems.wishListItems
  );

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
      toast.success("This Item is Added to your  Cart");
    } else {
      toast.error("This Item is Already Existed in the Cart");
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
    toast.success("This Item is Removed from wish List");
  }

  return (
    <li>
      {/* LIST */}
      <div className="flex flex-col gap-8 py-2 max-h-[40rem] overflow-y-auto">
        <div key={wishListItem.id} className="flex flex-col gap-5">
          <div className="flex gap-4">
            <Image
              src={wishListItem.image}
              alt=""
              width={80}
              height={80}
              className="object-cover rounded-xl"
            />

            <div className="flex flex-col justify-between w-full">
              {/* TOP */}
              <div className="text-2xl">
                {/* TITLE */}
                <div className="flex items-center justify-between gap-8">
                  <Link
                    href={`/${locale}/user/product/${wishListItem.slug}`}
                    className="font-semibold capitalize"
                  >
                    {wishListItem.name}
                  </Link>
                  <div className="p-1 bg-gray-50 rounded-xl flex items-center gap-2">
                    <div className="text-lg font-semibold text-green-500">
                      {wishListItem.quantity} x{" "}
                    </div>

                    {wishListItem.price}
                  </div>
                </div>
                {/* DESC */}
                <div className="flex justify-between  gap-4">
                  <div className="text-xl text-gray-500">
                    Size: {wishListItem.size}
                  </div>
                  <div className=" flex items-center gap-4 text-xl  text-gray-500">
                    <span>Color: </span>
                    <span
                      className=" w-5 h-5 rounded-full"
                      style={{ backgroundColor: wishListItem.color }}
                    >
                      &nbsp;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex justify-between items-center ">
            <button
              onClick={() => addToCartHandler(wishListItem)}
              className="p-3 bg-black text-white rounded-lg"
            >
              Add To cart
            </button>
            <button
              onClick={() => handleDeleteProduct(wishListItem)}
              className="text-blue-500 text-xl cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default WishListItem;
