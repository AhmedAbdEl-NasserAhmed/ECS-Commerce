"use client";

import { useGetSingleProductBySlugQuery } from "@/lib/features/api/productsApi";
import { AdminProductProps } from "@/types/types";
import Spinner from "@/ui/Spinner/Spinner";
import { Box } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useReducer, useState } from "react";
import { useGetCategoryByIdQuery } from "@/lib/features/api/categoriesApi";
import SubCategoriesList from "../../admin/dashboard/products/details/[slug]/SubCategoriesList";
import DropdownSizeOptions from "../../admin/dashboard/products/details/[slug]/DropdownSizeOptions";
import NavBar from "@/ui/NavBar/NavBar";
import Footer from "@/ui/Footer/Footer";
import { HiOutlineHeart } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addItem } from "@/lib/features/cartSlice/cartSlice";
import toast from "react-hot-toast";
import { initialState, reducerFn } from "./productDetailsReducer";

function ProductDetails() {
  const params = useParams();

  const { data, isLoading } = useGetSingleProductBySlugQuery(params.slug);

  const dispatchRedux = useAppDispatch();

  const state = useAppSelector((state) => state.cartSlice.cartItems);

  const [productDetailsState, dispatch] = useReducer(reducerFn, initialState);

  function action(type, payload = null) {
    dispatch(type, payload);
  }

  const [selectedProduct, setSelectedProduct] = useState<AdminProductProps>();

  const { data: mainCategory, isLoading: mainCategoryLoading } =
    useGetCategoryByIdQuery(selectedProduct?.category, {
      skip: !selectedProduct?.category,
    });

  const [currentProductIndex, setCurrentProductIndex] = useState<number>(0);

  const [imageIndex, setCurrentImageIndex] = useState<number>(0);

  const [selectedColor, setSelectedColor] = useState<{
    value: string;
    color: string;
    label: string;
    quantity: number;
  }>({ color: "", value: "", label: "", quantity: 0 });

  const [productQuantity, setProductQuantity] = useState<number>(0);

  const [isColorExisted, setIsColorExisted] = useState<boolean>(true);

  useEffect(() => {
    setSelectedColor(selectedProduct?.colors[0]);
  }, [selectedProduct?.colors]);

  useEffect(() => {
    setSelectedProduct(data?.data?.products[currentProductIndex]);
  }, [data?.data?.products, currentProductIndex]);

  useEffect(() => {
    const colorExists = state.some(
      (product) =>
        product.color === selectedColor?.color &&
        product.size === selectedProduct.size
    );

    setIsColorExisted(colorExists);
  }, [selectedColor, state, selectedProduct]);

  if (isLoading || mainCategoryLoading) return <Spinner />;

  function handleAddCartItem() {
    if (!selectedColor.value) {
      toast.error("Please select color");
      return;
    } else if (
      productQuantity === 0 ||
      productQuantity > selectedProduct.quantity
    ) {
      toast.error("Quanity must be more than 0");
      return;
    } else if (isColorExisted) {
      toast.error("This Color and Size are Already Existed");
      return;
    }
    toast.success("An item added to your cart");
    dispatchRedux(
      addItem({
        id: crypto.randomUUID().substring(0, 5),
        name: selectedProduct.name,
        size: selectedProduct.size,
        quantity: productQuantity,
        image: data?.data?.images[0].url,
        color: selectedColor.color,
        price: selectedProduct.saleProduct,
        maxQuantity: selectedColor.quantity,
      })
    );
  }

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    setCurrentProductIndex(selectedIndex);
    setSelectedColor({
      color: "",
      label: "",
      value: "",
      quantity: 0,
    });
    setProductQuantity(0);
  };

  function handleIncrementQuantity() {
    if (productQuantity === selectedColor.quantity || !selectedColor.label)
      return;
    setProductQuantity((cur) => cur + 1);
  }

  function handleDecrementQuantity() {
    if (productQuantity === 0 || !selectedColor.label) return;
    setProductQuantity((cur) => cur - 1);
  }

  return (
    <>
      <Box className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <NavBar />
        <Box className="flex p-[4rem] flex-col gap-16 lg:flex-row ">
          <Box className="flex flex-col md:flex-row gap-10 h-[500px] w-full ">
            <Box className="flex md:flex-col flex-row w-full md:w-1/4 h-1/2  gap-10 md:order-none order-1 ">
              {data?.data?.images.map((image, index) => {
                return (
                  <Box
                    onClick={() => setCurrentImageIndex(index)}
                    className={`${
                      index === imageIndex ? "opacity-70" : "opacity-40"
                    } ${
                      index === imageIndex ? "border-slate-400" : ""
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
                src={data?.data?.images?.[imageIndex].url}
                alt="img"
                fill
                className="object-contain rounded-2xl"
              />
            </Box>
          </Box>
          <Box className="flex flex-col gap-10 w-full ">
            <Box className="flex justify-between items-center ">
              <h2 className="text-4xl font-semibold capitalize">
                {selectedProduct?.name}
              </h2>
              <span className="text-4xl cursor-pointer">
                <HiOutlineHeart />
              </span>
            </Box>
            <Box className="flex items-center gap-4 flex-wrap">
              <Box>
                <h2 className="font-semibold text-xl">
                  {mainCategory?.data?.name}
                </h2>
              </Box>
              <Box className="flex items-center gap-4 flex-wrap">
                <SubCategoriesList
                  subCategoriesIds={selectedProduct?.subCategory}
                />
              </Box>
            </Box>
            <q className="text-2xl text-gray-400 capitalize">
              {selectedProduct?.description}
            </q>
            <Box className="flex items-center gap-5">
              <h2 className="text-3xl font-semibold ">
                {selectedProduct?.saleProduct} EGP
              </h2>
              {selectedProduct?.discount > 0 && (
                <h2 className="text-3xl font-semibold text-gray-400 line-through">
                  {selectedProduct?.price} EGP
                </h2>
              )}
            </Box>
            <Box className="w-1/2">
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
                {selectedProduct?.colors?.map((color) => {
                  return (
                    <div
                      onClick={() => {
                        setSelectedColor(color);
                        setProductQuantity(0);
                      }}
                      key={color.value}
                      className={`w-10 h-10 rounded ${
                        selectedColor?.value === color.value
                          ? "ring-offset-2 ring-2 ring-black "
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
            <Box className="flex items-center gap-5 ">
              <button
                onClick={handleDecrementQuantity}
                className="bg-black w-10 h-10 text-2xl flex items-center justify-center text-white p-2 rounded-full"
              >
                -
              </button>
              <input
                className="text-center p-4 rounded-xl text-2xl w-[15%] border-2 border-gray-200"
                type="number"
                value={productQuantity}
                readOnly
              />

              <button
                onClick={handleIncrementQuantity}
                className="bg-black w-10 h-10 text-2xl flex items-center justify-center text-white p-2 rounded-full"
              >
                +
              </button>
            </Box>
            {productQuantity === selectedColor?.quantity &&
              selectedColor?.value && (
                <p className="text-2xl text-red-600">
                  This is maximum Quantity for this product Color
                </p>
              )}
            <Box className="w-1/2">
              <button
                onClick={() => {
                  handleAddCartItem();
                  setProductQuantity(0);
                }}
                className="bg-[#ed0534] hover:bg-black transition duration-500 text-white p-4 text-2xl rounded-lg w-full"
              >
                Add To Cart
              </button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default ProductDetails;
