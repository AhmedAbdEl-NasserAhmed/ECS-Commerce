"use client";

import ProductFormInputsSwitch from "@/components/AdminProduct/ProductFormInputsSwitch";
import ShowUploadedImageProduct from "@/components/AdminProduct/showUploadedProductImage";
import productFormInputs from "@/constants/productFormInputs";
import { AdminProductProps } from "@/types/types";
import AddProductImage from "@/ui/AddProductImage/AddProductImage";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Box, Button, Typography } from "@mui/material";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { HiCloudUpload } from "react-icons/hi";
import { HiChevronRight, HiOutlinePlusCircle } from "react-icons/hi2";

function ProductPage() {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useForm<AdminProductProps>();

  function onSubmit(data: AdminProductProps) {
    // reset();
  }

  // const [pickedImagePaths, setPickedImagePaths] = useState<string[]>([]);

  // function handleImagepath(e: ChangeEvent<HTMLInputElement>) {
  //   const files = e.target.files;

  //   if (!files) return;

  //   const selectedImages = Array.from(files).map((image) =>
  //     URL.createObjectURL(image)
  //   );

  //   if (pickedImagePaths.length === 3) {
  //     toast.error(" Please Do not upload more than 3 images");
  //     return;
  //   }

  //   setPickedImagePaths((prevImages) => prevImages.concat(selectedImages));
  // }

  const formData = watch();

  console.log("formData", formData);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className=" flex flex-col gap-8 px-[4rem] py-[1.2rem] bg-[#FDFDFD]  "
    >
      <Box
        component="div"
        className="h-[10vh] flex justify-between items-center"
      >
        <Box component="div" className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold  text-gray-600">Add product</h2>
          <Box
            component="div"
            className="flex items-center gap-4 text-[1.4rem]"
          >
            <Link className="text-blue-400" href="/">
              Home
            </Link>
            <span>
              <HiChevronRight />
            </span>
            <h4>Product</h4>
          </Box>
        </Box>
        <Button
          sx={{
            paddingInline: "1.6rem",
            paddingBlock: "1rem",
            fontSize: "1.3rem",
            borderRadius: "5px",
            backgroundColor: "#5b93ff",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "black",
              boxShadow: "none",
            },
          }}
          type="button"
          variant="contained"
          size="large"
        >
          View All
        </Button>
      </Box>
      <Box
        component="div"
        className="relative grow flex flex-col gap-8 bg-white rounded-2xl border-2 p-10 border-slate-100 shadow-md"
      >
        <Box component="div" className="mb-4">
          <h2 className="text-3xl font-semibold mb-5">Add Product</h2>
          <span className=" absolute left-0 block h-[1px] w-full bg-gray-200">
            &nbsp;
          </span>
        </Box>

        <Box
          component="div"
          className="flex gap-8 flex-col lg:flex-row justify-between "
        >
          <Box component="div" className="grow-[4]">
            <Box
              component="div"
              className="grid grid-cols-autofill-minmax items-center gap-12"
            >
              {productFormInputs(formData).map((input) => {
                return (
                  <div key={input.id} className={input.className}>
                    <Controller
                      name={input.name}
                      control={control}
                      defaultValue={input.defaultValue}
                      rules={input.rules}
                      render={({ field }) => (
                        <ProductFormInputsSwitch
                          errors={errors}
                          input={input}
                          field={field}
                        />
                      )}
                    />
                  </div>
                );
              })}
            </Box>
          </Box>
          <Box component="div" className="grow-[2] text-center">
            <AddProductImage
              control={control}
              formData={formData}
              imagesNumber={3}
              setValue={setValue}
            />
          </Box>
        </Box>
        <Box component="div">
          <Button
            sx={{
              paddingInline: "1.6rem",
              paddingBlock: "1rem",
              fontSize: "1.3rem",
              borderRadius: "5px",
              backgroundColor: "#5b93ff",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "black",
                boxShadow: "none",
              },
            }}
            type="submit"
            variant="contained"
            size="large"
          >
            Add Product
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductPage;
// flex flex-col gap-[1.55rem]  md:gap-[2rem] w-full md:w-1/2
