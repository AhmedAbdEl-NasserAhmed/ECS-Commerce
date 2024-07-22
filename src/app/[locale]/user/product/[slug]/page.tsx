"use client";

import { useGetSingleProductBySlugQuery } from "@/lib/features/api/productsApi";
import Spinner from "@/ui/Spinner/Spinner";
import { Box, Button } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useReducer, useState } from "react";
import { useGetCategoryByIdQuery } from "@/lib/features/api/categoriesApi";
import { HiOutlineHeart } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addItem } from "@/lib/features/cartSlice/cartSlice";
import toast from "react-hot-toast";
import {
  initialState,
  ProductDetailsAction,
  reducerFn,
} from "./productDetailsReducer";
import SubCategoriesList from "@/app/[locale]/admin/dashboard/products/details/[slug]/SubCategoriesList";
import DropdownSizeOptions from "@/app/[locale]/admin/dashboard/products/details/[slug]/DropdownSizeOptions";
import BaseTabs from "@/ui/Tabs/Tabs";
import Reviews from "@/components/UserReviews/Reviews";
import BaseContainer from "@/ui/Container/BaseContainer";
import ReactStars from "react-stars";
import { UserType } from "@/types/enums";
import { Layout } from "@/config/layout";
import {
  useGetAllReviewsQuery,
  useGetProductReviewsQuery,
} from "@/lib/features/api/reviewsApi";
import Menus from "@/ui/Menus/Menus";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import ReviewsSorting from "@/components/UserReviews/ReviewsSorting";

function ProductDetails() {
  const params = useParams();

  const [productDetailsState, dispatch] = useReducer(reducerFn, initialState);

  const { data, isLoading } = useGetSingleProductBySlugQuery(params.slug);

  const [page, setPage] = useState<number>(1);

  const [sort, setSort] = useState<string>("");

  function handleSortChange(e: ChangeEvent<HTMLSelectElement>) {
    setSort(e.target.value);
  }

  const { data: reviews, isFetching: loadingReview } =
    useGetProductReviewsQuery(
      {
        id: productDetailsState?.selectedProduct?.productId,
      },
      { skip: !productDetailsState?.selectedProduct?.productId }
    );

  const dispatchRedux = useAppDispatch();

  const cart = useAppSelector((state) => state.cartSlice.cartItems);

  const user = useAppSelector((state) => state.usersSlice.user);

  function action(type, payload = null) {
    dispatch({ type, payload });
  }

  const { data: mainCategory, isLoading: mainCategoryLoading } =
    useGetCategoryByIdQuery(productDetailsState.selectedProduct?.category, {
      skip: !productDetailsState.selectedProduct?.category,
    });

  useEffect(() => {
    action(ProductDetailsAction.SET_SELECTED_PRODUCT, {
      value: data?.data?.products[productDetailsState.currentProductIndex],
    });
    // setSelectedProduct(data?.data?.products[productDetailsState.currentProductIndex]);
  }, [data?.data?.products, productDetailsState.currentProductIndex]);

  useEffect(() => {
    action(ProductDetailsAction.SET_SELECTED_COLOR, {
      value: productDetailsState.selectedProduct?.colors?.[0],
    });
  }, [productDetailsState.selectedProduct?.colors]);

  useEffect(() => {
    const colorExists = cart.some(
      (product) =>
        product.color === productDetailsState.selectedColor?.color &&
        product.size === productDetailsState.selectedProduct.size &&
        product.product === productDetailsState.selectedProduct.productId
    );

    action(ProductDetailsAction.SET_COLOR_EXISTED, { value: colorExists });
  }, [
    productDetailsState.selectedColor,
    cart,
    productDetailsState.selectedProduct,
  ]);

  function handleAddCartItem() {
    if (!productDetailsState.selectedColor.value) {
      toast.error("Please select color");
      return;
    } else if (
      productDetailsState.productQuantity === 0 ||
      productDetailsState.productQuantity >
        productDetailsState.selectedProduct.quantity
    ) {
      toast.error("Quanity must be more than 0");
      return;
    } else if (productDetailsState.isColorExisted) {
      toast.error("This Color and Size are Already Existed");
      return;
    }
    toast.success("An item added to your cart");
    dispatchRedux(
      addItem({
        product: productDetailsState.selectedProduct.productId,
        cartItemId: crypto.randomUUID().substring(0, 5),
        name: productDetailsState.selectedProduct.name,
        size: productDetailsState.selectedProduct.size,
        quantity: productDetailsState.productQuantity,
        image: data?.data?.images[0].url,
        color: productDetailsState.selectedColor.color,
        price: productDetailsState.selectedProduct.saleProduct,
        maxQuantity: productDetailsState.selectedColor.quantity,
        cart: user?.cart?.["_id"],
        colorId: productDetailsState.selectedColor["_id"],
      })
    );
  }

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    action(ProductDetailsAction.SET_CURRENT_PRODUCT_INDEX, {
      value: selectedIndex,
    });

    action(ProductDetailsAction.SET_SELECTED_COLOR, {
      value: {
        color: "",
        label: "",
        value: "",
        quantity: 0,
      },
    });

    action(ProductDetailsAction.SET_PRODUCT_QUANTITY, { value: 0 });
  };

  function handleIncrementQuantity() {
    if (
      productDetailsState.productQuantity ===
        productDetailsState.selectedColor.quantity ||
      !productDetailsState.selectedColor.label
    )
      return;

    action(ProductDetailsAction.SET_PRODUCT_QUANTITY, {
      value: productDetailsState.productQuantity + 1,
    });
  }

  function handleDecrementQuantity() {
    if (
      productDetailsState.productQuantity === 0 ||
      !productDetailsState.selectedColor.label
    )
      return;
    action(ProductDetailsAction.SET_PRODUCT_QUANTITY, {
      value: productDetailsState.productQuantity - 1,
    });
  }

  const isAdmin = user?.role === UserType.ADMIN;

  if (isLoading || mainCategoryLoading || loadingReview) return <Spinner />;

  return (
    <BaseContainer>
      <Box className="flex p-[4rem] flex-col gap-16 lg:flex-row ">
        <Box className="flex flex-col md:flex-row gap-10 h-[600px] w-full ">
          <Box className="flex md:flex-col flex-row w-full md:w-1/4 h-1/2 gap-10 md:order-none order-1 ">
            {data?.data?.images.map((image, index) => {
              return (
                <Box
                  onClick={() =>
                    action(ProductDetailsAction.SET_IMAGE_INDEX, {
                      value: index,
                    })
                  }
                  className={`${
                    index === productDetailsState.imageIndex
                      ? "opacity-70"
                      : "opacity-40"
                  } ${
                    index === productDetailsState.imageIndex
                      ? "border-slate-400"
                      : ""
                  } relative w-full h-full border-2 border-[#dcdbdb] cursor-pointer rounded-2xl transition-all duration-500`}
                  key={image.id}
                >
                  <Image
                    src={image.url}
                    alt="img"
                    fill
                    className="object-contain rounded-2xl "
                  />
                </Box>
              );
            })}
          </Box>
          <Box className="relative h-full w-full border-2 border-[#dcdbdb] rounded-2xl transition-all duration-500 ">
            <Image
              src={data?.data?.images?.[productDetailsState.imageIndex].url}
              alt="img"
              fill
              className="object-contain rounded-2xl"
            />
          </Box>
        </Box>
        <Box className="flex flex-col gap-10 w-full ">
          <Box className="flex justify-between items-center ">
            <h2 className="text-4xl font-semibold capitalize">
              {productDetailsState.selectedProduct?.name}
            </h2>
            {Layout.featureWishlist && (
              <span className="text-4xl cursor-pointer">
                <HiOutlineHeart />
              </span>
            )}
          </Box>
          <Box className="flex items-center gap-4 flex-wrap">
            <Box>
              <h2 className="font-semibold text-xl">
                {mainCategory?.data?.name}
              </h2>
            </Box>
            <Box className="flex items-center gap-4 flex-wrap">
              <SubCategoriesList
                subCategoriesIds={
                  productDetailsState.selectedProduct?.subCategory
                }
              />
            </Box>
          </Box>
          <div className="flex items-center gap-2">
            <div className="-translate-y-0.5">
              <ReactStars
                className="flex gap-1"
                edit={false}
                size={16}
                count={5}
                value={3}
                color1={"#CCC"}
                color2={"#ffd700"}
              />
            </div>
            <h2 className="font-semibold text-[1.4rem]">(2 Customer Review)</h2>
          </div>
          <q className="text-2xl text-gray-400 capitalize">
            {productDetailsState.selectedProduct?.description}
          </q>
          <Box className="flex items-center gap-5">
            <h2 className="text-3xl font-semibold ">
              {productDetailsState.selectedProduct?.saleProduct} EGP
            </h2>
            {productDetailsState.selectedProduct?.discount > 0 && (
              <h2 className="text-3xl font-semibold text-gray-400 line-through">
                {productDetailsState.selectedProduct?.price} EGP
              </h2>
            )}
          </Box>
          <Box className="md:w-1/2">
            <h2 className="text-2xl mb-5">Select Your Size</h2>
            <DropdownSizeOptions
              handleChange={handleChange}
              data={data?.data?.products}
            />
            {/* ed0534 */}
          </Box>
          <Box>
            <h2 className="text-2xl mb-5">Available Colors:</h2>
            <div className="flex gap-4">
              {productDetailsState.selectedProduct?.colors?.map((color) => {
                return (
                  <div
                    onClick={() => {
                      action(ProductDetailsAction.SET_SELECTED_COLOR, {
                        value: color,
                      });
                      action(ProductDetailsAction.SET_PRODUCT_QUANTITY, {
                        value: 0,
                      });
                    }}
                    key={color.value}
                    className={`cursor-pointer w-14 h-14 rounded-full ${
                      productDetailsState.selectedColor?.value === color.value
                        ? "ring-offset-2 ring-2 ring-slate-400"
                        : ""
                    } `}
                    style={{ backgroundColor: color.value }}
                  >
                    &nbsp;
                  </div>
                );
              })}
            </div>
          </Box>
          {!isAdmin && (
            <Box className="flex items-center gap-5 ">
              <button
                disabled={isAdmin}
                onClick={handleDecrementQuantity}
                className="bg-black w-10 h-10 text-2xl flex items-center justify-center text-white p-2 rounded-full"
              >
                -
              </button>
              <input
                className="text-center p-4 rounded-xl grow md:grow-0 text-2xl w-[15%] border-2 border-gray-200"
                type="number"
                value={productDetailsState.productQuantity}
                readOnly
              />

              <button
                disabled={isAdmin}
                onClick={handleIncrementQuantity}
                className="bg-black w-10 h-10 text-2xl flex items-center justify-center text-white p-2 rounded-full"
              >
                +
              </button>
            </Box>
          )}
          {productDetailsState.productQuantity ===
            productDetailsState.selectedColor?.quantity &&
            productDetailsState.selectedColor?.value && (
              <p className="text-2xl text-red-600">
                This is maximum Quantity for this product Color
              </p>
            )}
          {!isAdmin && (
            <Box className="md:w-1/2">
              <button
                disabled={isAdmin}
                onClick={() => {
                  handleAddCartItem();
                  action(ProductDetailsAction.SET_PRODUCT_QUANTITY, {
                    value: 0,
                  });
                }}
                className="bg-[#ed0534] hover:bg-black transition duration-500 text-white p-4 text-2xl rounded-lg w-full"
              >
                Add To Cart
              </button>
            </Box>
          )}
        </Box>
      </Box>
      {!isAdmin && (
        <Menus>
          <div className="relative ">
            <BaseTabs
              orientation="horizontal"
              tabs={[
                {
                  label: "Reviews",
                  content: (
                    <Reviews
                      productId={
                        productDetailsState?.selectedProduct?.productId
                      }
                      reviews={reviews?.data}
                    />
                  ),
                },
              ]}
            />
            <ReviewsSorting handleSortChange={handleSortChange} />
          </div>
        </Menus>
      )}
      {reviews?.numPages > page && (
        <Button
          disabled={loadingReview}
          onClick={() => setPage((page) => page + 1)}
          sx={{
            marginBottom: "2rem",
            width: "100%",
            padding: "0.85rem",
            fontSize: "1.2rem",
            backgroundColor: "#ed0534",
            "&:hover": {
              backgroundColor: "#161616",
            },
          }}
          type="button"
          variant="contained"
          size="large"
        >
          {loadingReview ? <MiniSpinner /> : "Show More"}
        </Button>
      )}
    </BaseContainer>
  );
}

export default ProductDetails;
