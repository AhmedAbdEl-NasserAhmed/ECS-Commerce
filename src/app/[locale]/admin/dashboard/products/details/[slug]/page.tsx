"use client";

import { useGetSingleProductBySlugQuery } from "@/lib/features/api/productsApi";
import { AdminProductProps } from "@/types/types";
import Spinner from "@/ui/Spinner/Spinner";
import { Box, Button } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useReducer, useState } from "react";
import DropdownSizeOptions from "./DropdownSizeOptions";
import { useGetCategoryByIdQuery } from "@/lib/features/api/categoriesApi";
import SubCategoriesList from "./SubCategoriesList";
import useImagesLoadingSpinner from "@/hooks/useImagesLoadingSpinner";

import {
  initialState,
  ProductViewActions,
  reducerFn
} from "./adminProductViewReducer";
import BaseContainer from "@/ui/Container/BaseContainer";
import { useGetProductReviewsQuery } from "@/lib/features/api/reviewsApi";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import BaseTabs from "@/ui/Tabs/Tabs";
import Reviews from "@/components/UserReviews/Reviews";
import ReviewsSorting from "@/components/UserReviews/ReviewsSorting";
import ReactStars from "@/ui/ReactStars/ReactStars";

function ProductDetails() {
  const params = useParams();

  const { data, isLoading } = useGetSingleProductBySlugQuery(params.slug);

  const [productState, dispatch] = useReducer(reducerFn, initialState);

  const [page, setPage] = useState<number>(1);

  const [sort, setSort] = useState<string>("");

  const { data: mainCategory, isLoading: mainCategoryLoading } =
    useGetCategoryByIdQuery(productState.selectedProduct?.category, {
      skip: !productState.selectedProduct?.category
    });

  const { data: reviews, isFetching: loadingReview } =
    useGetProductReviewsQuery(
      {
        id: productState?.selectedProduct?.productId,
        sort,
        page
      },
      { skip: !productState?.selectedProduct?.productId }
    );

  const { isLoadingImages, setIsLoadingImages } = useImagesLoadingSpinner();

  function action(type, payload = null) {
    dispatch({ type, payload });
  }

  function handleSortChange(e: ChangeEvent<HTMLSelectElement>) {
    setSort(e.target.value);
  }

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;

    action(ProductViewActions.SET_CURRENT_PRODUCT_INDEX, {
      value: selectedIndex
    });

    action(ProductViewActions.SET_SELECTED_COLOR, {
      value: {
        color: "",
        label: "",
        value: "",
        quantity: 0
      }
    });

    action(ProductViewActions.SET_PRODUCT_QUANTITY, { value: 1 });
  };

  useEffect(() => {
    action(ProductViewActions.SET_PRODUCT, {
      value: data?.data?.products[productState.currentProductIndex]
    });
  }, [data?.data?.products, productState.currentProductIndex]);

  useEffect(() => {
    action(ProductViewActions.SET_SELECTED_COLOR, {
      value: productState?.selectedProduct?.colors?.[0]
    });
  }, [productState?.selectedProduct?.colors]);

  useEffect(() => {
    action(ProductViewActions.SET_AVERAGE_RATING_STAR, {
      value:
        reviews?.data?.reduce((acc, review) => {
          return acc + review.ratings;
        }, 0) / reviews?.data?.length
    });
  }, [reviews?.data, reviews?.data.length]);

  if (isLoading || mainCategoryLoading) return <Spinner />;

  return (
    <BaseContainer className="p-[4rem]">
      <Box className="flex  flex-col gap-16 lg:flex-row ">
        <Box className="flex flex-col md:flex-row gap-5 h-[600px] w-full ">
          <Box className="flex md:flex-col flex-row md:order-none order-1 gap-14 ">
            {data?.data?.images.map((image, index) => {
              return (
                <Box
                  onClick={() =>
                    action(ProductViewActions.SET_IMAGE_INDEX, {
                      value: index
                    })
                  }
                  className={`${
                    index === productState?.imageIndex
                      ? "opacity-70"
                      : "opacity-40"
                  } ${
                    index === productState?.imageIndex ? "border-slate-400" : ""
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
                    onLoad={() => setIsLoadingImages(false)}
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
              src={data?.data?.images?.[productState?.imageIndex]?.url || ""}
              alt="img"
              fill
              onLoad={() => setIsLoadingImages(false)}
              className="object-contain border-2 border-[#dcdbdb] rounded-2xl"
            />
          </Box>
        </Box>
        <Box className="flex flex-col gap-10 w-full ">
          <h2 className="text-4xl font-semibold capitalize">
            {productState?.selectedProduct?.name}
          </h2>
          <Box className="flex items-center gap-4 flex-wrap">
            <Box>
              <h2 className="font-semibold text-xl">
                {mainCategory?.data?.name}
              </h2>
            </Box>
            <Box className="flex items-center gap-4 flex-wrap">
              <SubCategoriesList
                subCategoriesIds={productState.selectedProduct?.subCategory}
              />
            </Box>
          </Box>
          <div className="flex items-center gap-2">
            <div className="-translate-y-0.5 flex items-center">
              <ReactStars
                disabled={false}
                readOnly={true}
                size={"large"}
                value={productState.averageRatingStar}
              />
            </div>
            <h2 className="font-semibold text-[1.4rem]">
              ({reviews?.data?.length} Customer Review)
            </h2>
          </div>
          <q className="text-2xl text-gray-400 capitalize">
            {productState.selectedProduct?.description}
          </q>
          <Box className="flex items-center gap-5">
            <h2 className="text-3xl font-semibold ">
              {productState.selectedProduct?.saleProduct} EGP
            </h2>
            {productState.selectedProduct?.discount > 0 && (
              <h2 className="text-3xl font-semibold text-gray-400 line-through">
                {productState.selectedProduct?.price} EGP
              </h2>
            )}
          </Box>
          <Box className="md:w-1/2">
            <h2 className="text-2xl mb-5">Select Your Size</h2>
            <DropdownSizeOptions
              handleChange={handleChange}
              data={data?.data?.products}
            />
          </Box>
          <Box>
            <h2 className="text-2xl mb-5">Available Colors:</h2>
            <div className="flex gap-4">
              {productState.selectedProduct?.colors?.map((color) => {
                return (
                  <div
                    onClick={() => {
                      action(ProductViewActions.SET_SELECTED_COLOR, {
                        value: color
                      });
                      action(ProductViewActions.SET_PRODUCT_QUANTITY, {
                        value: 1
                      });
                    }}
                    key={color.value}
                    className={`cursor-pointer w-14 h-14 rounded-full ${
                      productState?.selectedColor?.value === color.value
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
        </Box>
      </Box>

      <div className="relative ">
        <BaseTabs
          orientation="horizontal"
          tabs={[
            {
              label: "Reviews",
              content: (
                <Reviews
                  productId={productState?.selectedProduct?.productId}
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
              backgroundColor: "#161616"
            }
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
