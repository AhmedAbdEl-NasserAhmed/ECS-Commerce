"use client";

import Image from "next/image";

const Cart = ({ setIsCartOpen }) => {
  return (
    <div className="w-max absolute p-4 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {false ? (
        <div className="">Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold">Shopping Cart</h2>
          {/* LIST */}
          <div className="flex flex-col gap-8">
            {/* ITEM */}

            {/* {cart.lineItems.map((item) => (
              <div className="flex gap-4" key={item._id}>
                {item.image && (
                  <Image
                    src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                    width={72}
                    height={96}
                    className="object-cover rounded-xl"
                  />
                )} */}
            {/* <div className="flex flex-col justify-between w-full"> */}
            {/* TOP */}
            {/* <div className=""> */}
            {/* TITLE */}
            {/* <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold">
                        {item.productName?.original}
                      </h3>
                      <div className="p-1 bg-gray-50 rounded-xl flex items-center gap-2">
                        {item.quantity && item.quantity > 1 && (
                          <div className="text-xs text-green-500">
                            {item.quantity} x{" "}
                          </div>
                        )}
                        ${item.price?.amount}
                      </div>
                    </div> */}
            {/* DESC */}
            {/* <div className="text-xl text-gray-500">
                      {item.availability?.status}
                    </div>
                  </div> */}
            {/* BOTTOM */}
            {/* <div className="flex justify-between text-xl">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <span
                      className="text-blue-500"
                      // onClick={() => removeItem(wixClient, item._id!)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))} */}

            <div className="flex gap-4">
              {true && (
                <Image
                  src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
                    <h3 className="font-semibold">{"item.productName"}</h3>
                    <div className="p-1 bg-gray-50 rounded-xl flex items-center gap-2">
                      {true && (
                        <div className="text-xs text-green-500">
                          {"item.quantity"} x{" "}
                        </div>
                      )}
                      ${"item.price"}
                    </div>
                  </div>
                  {/* DESC */}
                  <div className="text-xl text-gray-500">
                    {"item.availability"}
                  </div>
                </div>
                {/* BOTTOM */}
                <div className="flex justify-between text-xl">
                  <span className="text-gray-500">Qty. {"item.quantity"}</span>
                  <span
                    className="text-blue-500"
                    // onClick={() => removeItem(wixClient, item._id!)}
                  >
                    Remove
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* BOTTOM */}
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">Subtotal</span>
              {/* <span className="">${cart.subtotal.amount}</span> */}
            </div>
            <p className="text-gray-500 text-xl mt-2 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-xl">
              <button className="rounded-xl py-3 px-4 ring-1 ring-gray-300">
                View Cart
              </button>
              <button
                className="rounded-xl py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
                // disabled={isLoading}
                // onClick={handleCheckout}
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
