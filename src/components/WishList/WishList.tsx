"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import WishListItem from "./WishListItem";
import { clearCookiesThunk } from "@/lib/features/cookieSlice/cookieSlice";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

function WishList() {
  const wishList = useAppSelector(
    (state) => state.cookieSlice.cookieItems.wishListItems
  );

  const dispatch = useAppDispatch();

  const userTranslation = useTranslations("user");

  const removeAllCartItems = () => {
    dispatch(clearCookiesThunk("wishListItems"));
    toast.success(userTranslation("You Wish List is Empty 🥲 "));
  };

  if (!wishList.length)
    return (
      <div className="text-2xl bg-white text-black flex items-center justify-center font-semibold p-4">
        <p>{userTranslation("Start Adding Products To your Wish List")}</p>
      </div>
    );

  return (
    <ul className=" p-8 bg-white shadow-[0px_0px_7px_5px_#0000000a] w-full flex flex-col gap-8 ">
      <h2 className="text-3xl font-bold flex justify-center">
        {userTranslation("WISH LIST")}
      </h2>

      {wishList.map((wishListItem) => {
        return (
          <WishListItem
            key={wishListItem.product}
            wishListItem={wishListItem}
          />
        );
      })}

      <div className="flex w-full justify-center items-center text-xl ">
        <button
          className="p-4 w-full  bg-red-500 text-white rounded-lg"
          onClick={removeAllCartItems}
        >
          {userTranslation("Clear All")}
        </button>
      </div>
    </ul>
  );
}

export default WishList;
