import useClickOutside from "@/hooks/useClickOutside";
import {
  assignCartId,
  decrementProductItem,
  incrementProductItem,
  removeItem,
} from "@/lib/features/cartSlice/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CartItem } from "@/types/types";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

function CartSideMenu({ setOpenSideMenu, openSideMenu, setOpens }) {
  const { locale } = useParams();

  const router = useRouter();

  const cart = useAppSelector((state) => state.cartSlice.cartItems);

  const ref = useClickOutside({ close: setOpenSideMenu, value: false });

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.usersSlice.user);

  const token = useAppSelector((state) => state.usersSlice.token);

  function handleDeleteProduct(product) {
    dispatch(removeItem(product.cartItemId));
  }

  function addCartId() {
    dispatch(assignCartId(user?.cart["_id"]));
  }

  function handleIncrementProductQuantity(product) {
    if (product.quantity !== product.maxQuantity) {
      dispatch(
        incrementProductItem({
          id: product.cartItemId,
          maxQuantity: product.maxQuantity,
        })
      );
    } else {
      toast.error(" This is maximum Quantity for this product Color");
    }
  }

  function handleDecrementProductQuantity(product) {
    dispatch(decrementProductItem(product.cartItemId));
  }

  const totalCartItems = cart.reduce((acc, cur) => {
    return acc + +cur.quantity * +cur.price;
  }, 0);

  return (
    <div
      className={`fixed top-0 ${
        openSideMenu ? "left-0" : "-left-[550px]"
      } transition-all duration-300  h-screen w-full backdrop-filter backdrop-blur-sm z-50  `}
    >
      <div ref={ref} className="bg-white w-[70vw] h-full p-6 overflow-y-scroll">
        {cart.length === 0 ? (
          <div className="text-black  font-bold text-4xl">Cart is Empty</div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-black capitalize mb-10">
              Shopping Cart
            </h2>
            {/* LIST */}
            <div className="flex flex-col gap-14">
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
                        <div className="flex items-center justify-between gap-8 text-black">
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
                      <div className="flex justify-between items-center text-xl gap-8">
                        <span className="text-gray-500">
                          Qty. {product.quantity}
                        </span>

                        <div className="flex items-center gap-5 flex-row mr-auto ">
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
                          onClick={() => handleDeleteProduct(product)}
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
            <div className="mt-10">
              <div className="flex items-center justify-between font-bold text-xl text-black">
                <span className="">Total</span>
                <span className="">{totalCartItems} EGP</span>
              </div>
              <p className="text-gray-500 text-xl mt-2 mb-4">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="flex justify-end text-xl">
                <button
                  onClick={() => {
                    if (token) {
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
                  Checkout
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
