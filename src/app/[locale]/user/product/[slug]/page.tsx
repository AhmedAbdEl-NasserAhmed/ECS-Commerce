"use client";

import {
  useGetAllProductsQuery,
  useGetSingleProductBySlugQuery
} from "@/lib/features/api/productsApi";
import Spinner from "@/ui/Spinner/Spinner";
import { Box, Button } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  ChangeEvent,
  CSSProperties,
  useEffect,
  useReducer,
  useRef,
  useState
} from "react";
import { useGetCategoryByIdQuery } from "@/lib/features/api/categoriesApi";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import toast from "react-hot-toast";
import {
  initialState,
  ProductDetailsAction,
  reducerFn
} from "./productDetailsReducer";
import SubCategoriesList from "@/app/[locale]/admin/dashboard/products/details/[slug]/SubCategoriesList";
import BaseTabs from "@/ui/Tabs/Tabs";
import Reviews from "@/components/UserReviews/Reviews";
import BaseContainer from "@/ui/Container/BaseContainer";
import { UserType } from "@/types/enums";
import { useGetProductReviewsQuery } from "@/lib/features/api/reviewsApi";
import Menus from "@/ui/Menus/Menus";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import ReviewsSorting from "@/components/UserReviews/ReviewsSorting";
import useAddItemToCookie from "@/hooks/useAddItemToCart";
import {
  addItemThunk,
  removeItemThunk
} from "@/lib/features/cookieSlice/cookieSlice";
import useImagesLoadingSpinner from "@/hooks/useImagesLoadingSpinner";
import ReactStars from "@/ui/ReactStars/ReactStars";

import { FaCartPlus } from "react-icons/fa6";
import TitledProductList from "@/components/TitledProductList/TitledProductList";
import useWindowResize from "@/hooks/useWindowResize";
import Head from "next/head";
import SharableSocialLinks from "@/components/SharableSocialLinks/SharableSocialLinks";
import { Helmet } from "react-helmet";
import { useTranslations } from "next-intl";
import { formatCurrency } from "@/lib/helpers";

function ProductDetails() {
  const params = useParams();

  const { locale } = useParams();

  const [productDetailsState, dispatch] = useReducer(reducerFn, initialState);

  const dispatchRedux = useAppDispatch();

  const { data, isLoading } = useGetSingleProductBySlugQuery(params.slug);

  const [page, setPage] = useState<number>(1);

  const [sort, setSort] = useState<string>("");

  const userTranslation = useTranslations("user");

  const [selectedSize, setSelectedSize] = useState(null);

  function handleSortChange(e: ChangeEvent<HTMLSelectElement>) {
    setSort(e.target.value);
  }

  const _singleProduct = data?.data?.products?.[0];

  const { data: relatedProductsData, isLoading: isRelatedProductsLoading } =
    useGetAllProductsQuery(
      {
        limit: 4,
        categoryId: _singleProduct?.category,
        subCategory: _singleProduct?.subCategory?.join(",")
      },
      { skip: !_singleProduct }
    );

  const relatedProducts = relatedProductsData?.data?.filter(
    (product) =>
      product.name?.[locale as string] !==
        _singleProduct?.name?.[locale as string] &&
      product.size !== _singleProduct?.size
  );

  const areRelatedProductsEmpty =
    relatedProductsData?.data?.filter(
      (product) =>
        product.name?.[locale as string] !==
          _singleProduct?.name?.[locale as string] &&
        product.size !== _singleProduct?.size
    )?.length === 0;

  const { data: reviews, isFetching: fetchingReviews } =
    useGetProductReviewsQuery(
      {
        id: productDetailsState?.selectedProduct?.productId,
        sort,
        page
      },
      { skip: !productDetailsState?.selectedProduct?.productId }
    );

  const { addItemHandler: addCartItemHandler } = useAddItemToCookie(
    "cartItems",
    addItemThunk
  );

  const { addItemHandler: addWishListItemHandler } = useAddItemToCookie(
    "wishListItems",
    addItemThunk
  );

  const cart = useAppSelector(
    (state) => state.cookieSlice.cookieItems.cartItems
  );

  const wishList = useAppSelector(
    (state) => state.cookieSlice.cookieItems.wishListItems
  );

  const user = useAppSelector((state) => state.usersSlice.user);

  const { isLoadingImages, setIsLoadingImages } = useImagesLoadingSpinner();

  function action(type, payload = null) {
    dispatch({ type, payload });
  }

  const { data: mainCategory, isLoading: mainCategoryLoading } =
    useGetCategoryByIdQuery(productDetailsState?.selectedProduct?.category, {
      skip: !productDetailsState?.selectedProduct?.category
    });

  useEffect(() => {
    action(ProductDetailsAction.SET_SELECTED_PRODUCT, {
      value: data?.data?.products[productDetailsState?.currentProductIndex]
    });
    // setSelectedProduct(data?.data?.products[productDetailsState.currentProductIndex]);
  }, [data?.data?.products, productDetailsState?.currentProductIndex]);

  useEffect(() => {
    action(ProductDetailsAction.SET_SELECTED_COLOR, {
      value: productDetailsState?.selectedProduct?.colors?.[0]
    });
  }, [productDetailsState?.selectedProduct?.colors]);

  useEffect(() => {
    const colorExists = cart.some(
      (product) =>
        product.color === productDetailsState?.selectedColor?.color &&
        product.size === productDetailsState?.selectedProduct?.size &&
        product.product === productDetailsState?.selectedProduct.productId
    );

    action(ProductDetailsAction.SET_COLOR_EXISTED, { value: colorExists });
  }, [
    productDetailsState?.selectedColor,
    cart,
    productDetailsState?.selectedProduct
  ]);

  useEffect(() => {
    setSelectedSize(data?.data?.products?.[0]?.size);
  }, [data?.data?.products]);

  function handleAddCartItem(selectedProduct) {
    if (productDetailsState?.isColorExisted) {
      toast.error(userTranslation("This Color and Size are Already Existed"));
      return;
    }

    const isExistedInCart = cart.some((cartItem) => {
      return (
        cartItem.product === selectedProduct.productId &&
        cartItem.colorId === productDetailsState.selectedColor["_id"] &&
        cartItem.size === selectedProduct.size
      );
    });

    if (!isExistedInCart) {
      addCartItemHandler({
        data: {
          product: productDetailsState?.selectedProduct.productId,
          cartItemId: crypto.randomUUID().substring(0, 5),
          name: productDetailsState?.selectedProduct.name,
          size: productDetailsState?.selectedProduct.size,
          quantity: productDetailsState?.productQuantity,
          image: data?.data?.images[0].url,
          color: productDetailsState?.selectedColor.color,
          price: productDetailsState?.selectedProduct.saleProduct,
          maxQuantity: productDetailsState?.selectedColor.quantity,
          cart: user?.cart?.["_id"],
          colorId: productDetailsState?.selectedColor["_id"],
          slug: productDetailsState?.selectedProduct.slug
        },
        message: userTranslation("This Item is Added to your  Cart")
      });

      dispatchRedux(
        removeItemThunk(
          "wishListItems",
          wishList.filter(
            (wistListItem) =>
              wistListItem.colorId !== productDetailsState?.selectedColor["_id"]
          )
        )
      );
    }
  }

  useEffect(() => {
    action(ProductDetailsAction.SET_EXISTED_WISHlIST_ITEM, {
      value: wishList.map((wishListItem) => wishListItem.colorId)
    });
  }, [wishList]);

  function addWishListProducthandler() {
    if (
      productDetailsState.existedWishListItems.includes(
        productDetailsState.selectedColor["_id"]
      )
    ) {
      const filtredWishList = wishList.filter((wishListItem) => {
        return (
          wishListItem.colorId !== productDetailsState?.selectedColor["_id"]
        );
      });

      dispatchRedux(removeItemThunk("wishListItems", filtredWishList));

      toast.success(userTranslation("This Item is Removed from wish List"));
    } else {
      const isExistedInCart = cart.some((carItem) => {
        return (
          carItem.product === productDetailsState?.selectedProduct.productId &&
          carItem.colorId === productDetailsState?.selectedColor?.["_id"] &&
          carItem.size === productDetailsState?.selectedProduct.size
        );
      });

      if (!isExistedInCart) {
        addWishListItemHandler({
          data: {
            product: productDetailsState?.selectedProduct.productId,
            cartItemId: crypto.randomUUID().substring(0, 5),
            name: productDetailsState?.selectedProduct.name,
            size: productDetailsState?.selectedProduct.size,
            quantity: productDetailsState?.productQuantity,
            image: data?.data?.images[0].url,
            color: productDetailsState?.selectedColor.color,
            price: productDetailsState?.selectedProduct.saleProduct,
            maxQuantity: productDetailsState?.selectedColor.quantity,
            colorId: productDetailsState?.selectedColor["_id"],
            slug: productDetailsState?.selectedProduct.slug
          },
          message: userTranslation("This Item is Added to your Wish List")
        });
      } else {
        toast.error(
          userTranslation("This Item is Already Existed in the Cart")
        );
      }
    }
  }

  const handleChange = (selectedIndex) => {
    action(ProductDetailsAction.SET_CURRENT_PRODUCT_INDEX, {
      value: selectedIndex
    });

    action(ProductDetailsAction.SET_SELECTED_COLOR, {
      value: {
        color: "",
        label: "",
        value: "",
        quantity: 0
      }
    });

    action(ProductDetailsAction.SET_PRODUCT_QUANTITY, { value: 1 });
  };

  function handleIncrementQuantity() {
    if (
      productDetailsState?.productQuantity ===
        productDetailsState?.selectedColor.quantity ||
      !productDetailsState?.selectedColor.label
    )
      return;

    action(ProductDetailsAction.SET_PRODUCT_QUANTITY, {
      value: productDetailsState?.productQuantity + 1
    });
  }

  function handleDecrementQuantity() {
    if (
      productDetailsState?.productQuantity === 1 ||
      !productDetailsState?.selectedColor.label
    )
      return;
    action(ProductDetailsAction.SET_PRODUCT_QUANTITY, {
      value: productDetailsState?.productQuantity - 1
    });
  }

  function handleLoadingImages() {
    setIsLoadingImages(false);
  }

  const isAdmin = user?.role === UserType.ADMIN;

  useEffect(() => {
    action(ProductDetailsAction.SET_AVERAGE_RATING_STAR, {
      value:
        reviews?.data?.reduce((acc, review) => {
          return acc + review.ratings;
        }, 0) / reviews?.data?.length
    });
  }, [reviews?.data]);

  const windowWidth = useWindowResize();

  const [dynamicHref, setDynamicHref] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDynamicHref(window.location.href);
    }
    // eslint-disable-next-line
  }, [typeof window]);

  if (mainCategoryLoading) return <Spinner />;

  if (!_singleProduct && !data?.data.images) return null;

  const isExceededMaxQuantity =
    productDetailsState?.productQuantity ===
      productDetailsState?.selectedColor?.quantity &&
    productDetailsState?.selectedColor?.value;

  const imageUrl =
    data?.data.images?.[0]?.url || "https://via.placeholder.com/1200x630";

  return (
    <>
      <Helmet>
        <title>{_singleProduct.name?.[locale as string]}</title>
        <meta
          property="og:image"
          content="https://res.cloudinary.com/practicaldev/image/fetch/s--0qQ47wTC--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wcg9dbu0z2ca1e9dxy1g.png"
        />

        <meta name="title" content={_singleProduct.name?.[locale as string]} />
        <meta
          name="description"
          content={_singleProduct.description?.[locale as string]}
        />

        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="ORCA" />
        <meta property="og:image" itemProp="image" content={imageUrl} />
        <meta
          property="og:image:secure_url"
          itemProp="image"
          content={imageUrl}
        />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="800" />
        <meta
          property="og:image:alt"
          content={_singleProduct.name?.[locale as string]}
        />
        <meta property="og:image:type" content="image/png" />

        <meta property="og:url" content={`${dynamicHref}`} />
        <meta
          property="og:title"
          content={_singleProduct.name?.[locale as string]}
        />
        <meta
          property="og:description"
          content={_singleProduct.description?.[locale as string]}
        />
        <meta property="twitter:title" content="Twitter title" />
        <meta property="twitter:description" content="Twitter desc" />
        <meta property="twitter:image" content={imageUrl} />
        <meta property="twitter:card" content="summary" />
        <meta property="og:updated_time" content="1440432930" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <BaseContainer className="p-[4rem]">
        <Box className="flex  flex-col gap-16 lg:flex-row ">
          <Box
            className="flex flex-col md:flex-row gap-5 h-[70rem] w-full"
            sx={{
              position: windowWidth > 1050 ? "sticky" : "",
              top: "1rem"
            }}
          >
            <Box className="flex md:flex-col flex-row md:order-none order-1 gap-10">
              {data?.data?.images.map((image, index) => {
                return (
                  <Box
                    onClick={() =>
                      action(ProductDetailsAction.SET_IMAGE_INDEX, {
                        value: index
                      })
                    }
                    className={`${
                      index === productDetailsState?.imageIndex
                        ? "opacity-70"
                        : "opacity-40"
                    } ${
                      index === productDetailsState?.imageIndex
                        ? "border-slate-400"
                        : ""
                    } relative w-[10rem] h-[10rem] cursor-pointer transition-all duration-500`}
                    key={image.id}
                  >
                    {isLoadingImages && (
                      <div className="flex items-center justify-center flex-col h-full">
                        <Spinner />
                      </div>
                    )}
                    <Image
                      src={image?.url || ""}
                      alt="img"
                      quality={100}
                      onLoad={handleLoadingImages}
                      fill
                      className="object-cover rounded-2xl border-2 border-[#dcdbdb]"
                    />
                  </Box>
                );
              })}
            </Box>
            <Box className="relative grow transition-all duration-500 ">
              {isLoadingImages && (
                <div className="flex items-center justify-center flex-col h-full">
                  <Spinner />
                </div>
              )}
              <Image
                src={
                  data?.data?.images?.[productDetailsState?.imageIndex]?.url ||
                  ""
                }
                alt="img"
                fill
                onLoad={handleLoadingImages}
                className="object-cover border-2 border-[#dcdbdb] rounded-2xl"
              />
            </Box>
          </Box>
          <Box className="flex flex-col gap-10 w-full ">
            <SharableSocialLinks
              dynamicHref={dynamicHref}
              data={_singleProduct}
            />
            {isLoading ? (
              <Spinner />
            ) : (
              <Box className="flex justify-between items-center  ">
                <h2 className="text-4xl font-semibold capitalize">
                  {
                    productDetailsState?.selectedProduct?.name?.[
                      locale as string
                    ]
                  }
                </h2>

                {productDetailsState?.isColorExisted && (
                  <p className="text-xl font-semibold capitalize">
                    {userTranslation("Item added to cart")}
                  </p>
                )}

                {!productDetailsState?.isColorExisted && !isAdmin && (
                  <span
                    onClick={addWishListProducthandler}
                    className="text-5xl cursor-pointer text-[#ed0534]"
                  >
                    {productDetailsState.existedWishListItems.includes(
                      productDetailsState.selectedColor?.["_id"]
                    ) ? (
                      <HiHeart />
                    ) : (
                      <HiOutlineHeart />
                    )}
                  </span>
                )}
              </Box>
            )}

            <Box className="flex items-center gap-4 flex-wrap">
              <Box>
                <h2 className="font-semibold text-xl">
                  {mainCategory?.data?.name?.[locale as string]}
                </h2>
              </Box>
              <Box className="flex items-center gap-4 flex-wrap">
                <SubCategoriesList
                  subCategoriesIds={
                    productDetailsState?.selectedProduct?.subCategory
                  }
                />
              </Box>
            </Box>

            {!!productDetailsState?.selectedProduct?.discount && (
              <span
                className="bg-[#f1c40f] uppercase py-[.3rem] px-[.8rem] rounded transition-all duration-500"
                style={{
                  marginInlineEnd: "auto"
                }}
              >
                {userTranslation("Sale")}
              </span>
            )}

            {fetchingReviews ? (
              <Spinner />
            ) : (
              <div className="flex items-center gap-2">
                <div className="-translate-y-0.5">
                  <ReactStars
                    readOnly={true}
                    size={"large"}
                    value={productDetailsState.averageRatingStar}
                  />
                </div>
                <h2 className="font-semibold text-[1.4rem]">
                  ({reviews?.data?.length} {userTranslation("Customer Review")}{" "}
                  )
                </h2>
              </div>
            )}
            <Box className="flex items-center gap-5">
              <h2 className="text-3xl font-semibold ">
                {formatCurrency(
                  productDetailsState?.selectedProduct?.saleProduct,
                  locale as string
                )}
              </h2>
              {productDetailsState?.selectedProduct?.discount > 0 && (
                <h2 className="text-3xl font-semibold text-gray-400 line-through">
                  {formatCurrency(
                    productDetailsState?.selectedProduct?.price,
                    locale as string
                  )}
                </h2>
              )}
            </Box>
            <q className="text-2xl text-gray-400 capitalize leading-10">
              {
                productDetailsState?.selectedProduct?.description?.[
                  locale as string
                ]
              }
            </q>
            <Box className="md:w-1/2 my-5">
              <h2 className="text-2xl mb-5">
                {userTranslation("Pick Your Size")}
              </h2>
              <div className="flex items-center gap-5">
                {data?.data?.products?.map((product, idx) => {
                  return (
                    <div
                      key={product.size}
                      className="cursor-pointer w-[4rem] py-5 bg-white text-center rounded-lg text-[#161616] uppercase font-semibold "
                      style={{
                        background:
                          selectedSize === product.size ? "#161616" : "",
                        color: selectedSize === product.size ? "white" : "",
                        outline: "1px solid #161616"
                      }}
                      onClick={() => {
                        if (selectedSize === product.size) return;
                        handleChange(idx);
                        setSelectedSize(product.size);
                      }}
                    >
                      {product.size}
                    </div>
                  );
                })}
              </div>
            </Box>
            <Box className="my-5">
              <h2 className="text-2xl mb-5">
                {userTranslation("Pick Your Color")}
              </h2>
              <div className="flex gap-4">
                {productDetailsState?.selectedProduct?.colors?.map((color) => {
                  return (
                    <div
                      onClick={() => {
                        action(ProductDetailsAction.SET_SELECTED_COLOR, {
                          value: color
                        });
                        action(ProductDetailsAction.SET_PRODUCT_QUANTITY, {
                          value: 1
                        });
                      }}
                      key={color.value}
                      className={`cursor-pointer w-8 h-8  border-2 border-[#F5F5F5] rounded-full ${
                        productDetailsState?.selectedColor?.value ===
                        color.value
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
              <Box className="flex items-center gap-5 my-5">
                <button
                  disabled={productDetailsState?.productQuantity <= 1}
                  onClick={handleDecrementQuantity}
                  className="bg-black w-10 h-10 text-2xl flex items-center justify-center text-white p-2 rounded-full disabled:opacity-30"
                >
                  -
                </button>
                <input
                  className="text-center p-4 rounded-xl grow md:grow-0 text-2xl w-[15%] border-2 border-gray-200"
                  type="number"
                  value={productDetailsState?.productQuantity}
                  readOnly
                />

                <button
                  disabled={isExceededMaxQuantity}
                  onClick={handleIncrementQuantity}
                  className="bg-black w-10 h-10 text-2xl flex items-center justify-center text-white p-2 rounded-full disabled:opacity-30"
                >
                  +
                </button>
              </Box>
            )}
            {isExceededMaxQuantity && (
              <p className="text-2xl text-red-600">
                {userTranslation(
                  "This is maximum Quantity for this product Color"
                )}
              </p>
            )}
            {!isAdmin && (
              <Box className="md:w-1/2">
                <button
                  disabled={isAdmin}
                  onClick={() => {
                    handleAddCartItem(productDetailsState?.selectedProduct);
                    action(ProductDetailsAction?.SET_PRODUCT_QUANTITY, {
                      value: 1
                    });
                  }}
                  className="bg-[#ed0534] hover:bg-black transition duration-500 text-white p-4 text-2xl rounded-lg w-full"
                >
                  <div className="flex justify-center items-center gap-5">
                    <FaCartPlus color="white" />
                    <span>{userTranslation("Add To cart")}</span>
                  </div>
                </button>
              </Box>
            )}
          </Box>
        </Box>
        <hr className="my-20" />
        {relatedProducts &&
          Array.isArray(relatedProducts) &&
          relatedProducts.length > 0 && (
            <Box className="mt-30">
              <TitledProductList
                title={userTranslation("Related Products")}
                description="Mauris luctus nisi sapien tristique dignissim ornare"
                products={relatedProducts}
                isLoading={isLoading}
                columns={4}
              />
            </Box>
          )}
        {!isAdmin && (
          <Box className="mt-30">
            <Menus>
              {fetchingReviews ? (
                <Spinner />
              ) : (
                <div className="relative ">
                  <BaseTabs
                    orientation="horizontal"
                    tabs={[
                      {
                        label: userTranslation("Reviews"),
                        content: (
                          <Reviews
                            productId={
                              productDetailsState?.selectedProduct?.productId
                            }
                            reviews={reviews?.data}
                          />
                        )
                      }
                    ]}
                  />
                  {reviews?.data?.length > 0 && (
                    <ReviewsSorting handleSortChange={handleSortChange} />
                  )}
                </div>
              )}
            </Menus>
          </Box>
        )}
        {reviews?.numPages > page && (
          <Button
            disabled={fetchingReviews}
            onClick={() => setPage((page) => page + 1)}
            sx={{
              marginBottom: "2rem",
              width: "100%",
              padding: "0.85rem",
              fontSize: "1.2rem",
              backgroundColor: "#ed0534",
              "&:hover": {
                backgroundColor: "#161616"
              }
            }}
            type="button"
            variant="contained"
            size="large"
          >
            {fetchingReviews ? <MiniSpinner /> : "Show More"}
          </Button>
        )}
      </BaseContainer>
    </>
  );
}

export default ProductDetails;
