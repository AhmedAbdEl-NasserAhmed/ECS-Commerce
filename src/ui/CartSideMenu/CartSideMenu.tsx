import useClickOutside from "@/hooks/useClickOutside";
import useImagesLoadingSpinner from "@/hooks/useImagesLoadingSpinner";
import {
  clearCookiesThunk,
  removeItemThunk,
  setCookiesThunk,
} from "@/lib/features/cookieSlice/cookieSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { UserType } from "@/types/enums";
import { CartItem } from "@/types/types";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Spinner from "../Spinner/Spinner";
import { useTranslations } from "next-intl";

function CartSideMenu({ setOpenSideMenu, openSideMenu, setOpens }) {
  const { locale } = useParams();

  const router = useRouter();

  const cart = useAppSelector(
    (state) => state.cookieSlice.cookieItems.cartItems
  );

  const { isLoadingImages, setIsLoadingImages } = useImagesLoadingSpinner();

  const ref = useClickOutside({ close: setOpenSideMenu, value: false });

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

  const removeAllCartItems = () => {
    dispatch(clearCookiesThunk("cartItems"));
  };

  const totalCartItems = cart.reduce((acc, cur) => {
    return acc + +cur.quantity * +cur.price;
  }, 0);

  return (
    <div
      className={`fixed top-0 ${
        openSideMenu ? "start-0" : "-start-[900px]"
      } transition-all duration-300 text-xl  h-screen w-full backdrop-filter backdrop-blur-sm z-50  `}
    >
      <div ref={ref} className="bg-white w-[70vw] h-full p-6 overflow-y-scroll">
        {cart.length === 0 ? (
          <div className="text-black  font-bold text-2xl">
            {t("Cart is Empty")}
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-semibold text-black capitalize ">
                Shopping Cart
              </h2>
              <button
                className="p-2 bg-red-500 text-white rounded-lg"
                onClick={removeAllCartItems}
              >
                {t("Clear All")}
              </button>
            </div>
            {/* LIST */}

            <div className="flex flex-col gap-14">
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
                        <div className="flex items-center justify-between gap-8 text-black">
                          <h3 className="font-semibold capitalize">
                            {product.name?.[locale as string]}
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
                            {t("Size")}: {product.size}
                          </div>
                          <div className=" flex items-center gap-4 text-xl  text-gray-500">
                            <span>{t("Color")}:</span>
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
                      <div className="flex justify-between items-center text-xl gap-8">
                        <span className="text-gray-500">
                          {t("Qty")}
                          {product.quantity}
                        </span>

                        <div className="flex items-center gap-5 flex-row mr-auto ">
                          <button
                            className={` ${
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
                          onClick={() => {
                            handleDeleteProduct(product);
                          }}
                        >
                          {t("Remove")}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* BOTTOM */}
            <div className="mt-10">
              <div className="flex items-center justify-between font-bold text-xl text-black">
                <span className="">{t("Total")}</span>
                <span className="">
                  {Math.trunc(totalCartItems)}
                  {t("EGP")}
                </span>
              </div>
              <p className="text-gray-500 text-xl mt-2 mb-4">
                {t("Shipping and taxes calculated at checkout")}
              </p>
              <div className="flex justify-end text-xl">
                <button
                  onClick={() => {
                    if (token && user.isActive) {
                      setOpenSideMenu(false);
                      setOpens(false);
                      addCartId();
                      router.push(`/${locale}/user/checkout`);
                    } else {
                      toast.error("Please Log in First");
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
    </div>
  );
}

export default CartSideMenu;
