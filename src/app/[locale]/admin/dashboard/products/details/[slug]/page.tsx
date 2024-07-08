"use client";

import { useGetSingleProductBySlugQuery } from "@/lib/features/api/productsApi";
import { AdminProductProps } from "@/types/types";
import Spinner from "@/ui/Spinner/Spinner";
import { Box } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import DropdownSizeOptions from "./DropdownSizeOptions";
import {
  useGetAllSubCategoriesByCategoryQuery,
  useGetSubCategoryByIdQuery,
} from "@/lib/features/api/subCategoriesApi";
import { useGetCategoryByIdQuery } from "@/lib/features/api/categoriesApi";
import SubCategoriesList from "./SubCategoriesList";

function ProductDetails() {
  const params = useParams();

  const { data, isLoading } = useGetSingleProductBySlugQuery(params.slug);

  const [selectedProduct, setSelectedProduct] = useState<AdminProductProps>();

  const [currentProductIndex, setCurrentProductIndex] = useState<number>(0);

  const [imageIndex, setCurrentImageIndex] = useState<number>(0);

  // const { data: subCategories, isLoading: subCategoriesLoading } =
  //   useGetSubCategoryByIdQuery(selectedProduct?.category, {
  //     skip: !selectedProduct?.category,
  //   });

  // console.log("selectedProduct", selectedProduct);

  const { data: mainCategory, isLoading: mainCategoryLoading } =
    useGetCategoryByIdQuery(selectedProduct?.category, {
      skip: !selectedProduct?.category,
    });

  useEffect(() => {
    setSelectedProduct(data?.data?.products[currentProductIndex]);
  }, [data?.data?.products, currentProductIndex]);

  if (isLoading || mainCategoryLoading) return <Spinner />;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    setCurrentProductIndex(selectedIndex);
  };

  return (
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
        <h2 className="text-4xl font-semibold">{selectedProduct?.name}</h2>
        <Box className="flex items-center gap-4">
          <Box>
            <h2 className="font-semibold text-xl">
              {mainCategory?.data?.name}
            </h2>
          </Box>
          <Box className="flex items-center gap-4">
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
          <h2 className="text-3xl font-semibold text-gray-400 line-through">
            {selectedProduct?.price} EGP
          </h2>
        </Box>
        <Box className="w-full">
          <h2 className="text-2xl mb-5">Select Your Size</h2>
          <DropdownSizeOptions
            handleChange={handleChange}
            data={data?.data?.products}
          />
        </Box>
        <Box>
          <h2 className="text-2xl mb-5">Available Colors:</h2>
          <div className="flex gap-4">
            {selectedProduct?.colors?.map((color) => {
              return (
                <div
                  key={color.value}
                  className="w-10 h-10 rounded"
                  style={{ backgroundColor: color.value }}
                >
                  &nbsp;
                </div>
              );
            })}
          </div>
        </Box>
        <Box className="w-1/4 ">
          <h2 className="text-2xl mb-5">Quantity:</h2>
          <input
            disabled
            className="w-full text-xl inline-block bg-white  p-4 border-2 border-gray-200"
            type="number"
            value={selectedProduct?.quantity || 0}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ProductDetails;
