"use client";

import ShowUploadedImageProduct from "@/components/AdminProduct/showUploadedProductImage";
import productFormInputs from "@/constants/productFormInputs";
import productFormInputsSelectMenus from "@/constants/productFormInputsSelectMenus";
import { AdminProductProps } from "@/types/types";
import SelectMenu from "@/ui/SelectMenu/SelectMenu";
import CustomizedTextField from "@/ui/TextField/TextField";
import UploadButton from "@/ui/uploadButton";
import { Box, Button, Typography } from "@mui/material";

import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { HiCloudUpload } from "react-icons/hi";
import { HiOutlinePlusCircle } from "react-icons/hi2";

function ProductPage() {
  const {
    handleSubmit,
    control,

    reset,
    formState: { errors },
  } = useForm<AdminProductProps>();

  function onSubmit(data: AdminProductProps) {
    console.log("data", data);

    reset();
  }

  const [pickedImagePaths, setPickedImagePaths] = useState<string[]>([]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [uploadImagesNumber, setUploadedImagesNumber] =
    useState<boolean>(false);

  function handleImagepath(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (!files) return;

    const selectedImages = Array.from(files).map((image) =>
      URL.createObjectURL(image)
    );

    const exceededImagesNumber =
      pickedImagePaths.length + selectedImages.length > 8;

    if (selectedImages.length > 8 || exceededImagesNumber) {
      setUploadedImagesNumber(true);
      return;
    } else {
      setUploadedImagesNumber(false);
    }

    setPickedImagePaths((prevImages) => prevImages.concat(selectedImages));
  }

  useEffect(() => {
    if (!pickedImagePaths.length) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prev) =>
        currentIndex === pickedImagePaths.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex, pickedImagePaths]);

  return (
    <Box
      component="div"
      className=" p-[1.8rem] md:p-[4rem] overflow-y-scroll  "
    >
      <Box
        component="div"
        className="flex justify-between items-center mb-[1rem] md:mb-[2rem] "
      >
        <Typography
          className="text-cyan-500 font-semibold "
          variant="h4"
          component="h4"
        >
          ADD PRODUCT
        </Typography>
        {/* <Box component="div" className="md:hidden">
          {pickedImagePaths && (
            // <ShowUploadedImageProduct selectedImagePaths={pickedImagePaths} />
          )}
        </Box> */}
      </Box>
      <Box
        component="form"
        className="flex  gap-[2.2rem]   "
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box
          component="div"
          className="flex flex-col gap-[1.55rem]  md:gap-[2rem] w-full md:w-1/2  "
        >
          {productFormInputs.map((input) => {
            return (
              <Controller
                key={input.id}
                name={input.name}
                control={control}
                defaultValue={input.defaultValue}
                rules={input.rules}
                render={({ field }) => (
                  <CustomizedTextField
                    multiline={input.multiline}
                    rows={input.row}
                    field={field}
                    error={!!errors[input.name]}
                    formerHelperStyles={input.formerHelperStyles}
                    helperText={
                      errors[input.name] ? errors[input.name].message : ""
                    }
                    type={input.type}
                    label={input.label}
                    variant={input.variant}
                    size={input.size}
                    sx={input.sx}
                  />
                )}
              />
            );
          })}

          {productFormInputsSelectMenus.map((selectMenu) => {
            return (
              <Controller
                key={selectMenu.id}
                name={selectMenu.name}
                control={control}
                defaultValue={selectMenu.defaultValue}
                rules={selectMenu.rules}
                render={({ field }) => (
                  <SelectMenu
                    name={selectMenu.name}
                    errors={errors}
                    options={selectMenu.options}
                    hasError={!!errors[selectMenu.name]}
                    field={field}
                    placeholder={selectMenu.placeholder}
                  />
                )}
              />
            );
          })}

          <Box component="div" className="flex items-center gap-12 md:block ">
            <Button
              className="w-full md:w-max "
              sx={{
                backgroundColor: "#3dbadd",
                "&:hover": {
                  backgroundColor: "#28abcf",
                },
              }}
              type="submit"
              variant="contained"
              size="large"
            >
              Add Product
            </Button>
            <Button
              className=" md:hidden w-full "
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<HiCloudUpload />}
            >
              Upload Image
              <UploadButton handleImagePath={handleImagepath} />
            </Button>
          </Box>
        </Box>

        <Box
          component="div"
          className=" md:flex flex-col gap-10 w-1/2 max-h-[60vh] hidden "
        >
          {uploadImagesNumber && (
            <p className="text-center text-xl bg-red-400 w-max m-auto font-bold p-2  text-white">
              Please Do not upload more than 8 images
            </p>
          )}

          {/* {!pickedImagePaths.length && !uploadImagesNumber && (
          )} */}
          {pickedImagePaths.length > 0 && (
            <Box component="div" className="w-full relative h-full  ">
              {pickedImagePaths.map((image, index) => {
                return (
                  <Box
                    component="div"
                    className={` absolute w-full h-full ${
                      index === currentIndex ? "slider-img" : ""
                    } transition-all ease-in-out duration-500 opacity-0 `}
                    key={index}
                  >
                    <Image
                      key={index}
                      className="object-contain"
                      src={image}
                      fill
                      sizes="100%"
                      alt="product image"
                    />
                  </Box>
                );
              })}
            </Box>
          )}

          {pickedImagePaths.length > 0 && (
            <Box component="div" className="flex items-center justify-between ">
              <Box
                component="div"
                className=" w-full h-[5rem] flex gap-8 justify-center "
              >
                {pickedImagePaths.map((image, index) => (
                  <Box
                    component="div"
                    onClick={() => setCurrentIndex(index)}
                    className={`${
                      index === currentIndex ? "border-2 border-gray-600" : ""
                    } relative flex cursor-pointer border-2 border-cyan-500`}
                    key={index}
                  >
                    <Image
                      className="object-cover"
                      src={image}
                      width={45}
                      height={35}
                      alt="product image"
                    />
                    <span
                      className={`absolute opacity-40 ${
                        currentIndex === index ? "clear-opacity" : ""
                      } bg-slate-600 left-0 top-0 h-full w-full`}
                    ></span>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {pickedImagePaths.length < 8 && (
            <div className="flex cursor-pointer text-center justify-end transition-all duration-300 hover:bg-slate-200 text-xl gap-6 items-center border-2 border-dashed border-black">
              <Button
                className="flex justify-center w-full h-full items-center gap-4"
                component="label"
                role={undefined}
                variant="text"
                tabIndex={-1}
                sx={{
                  fontSize: "1.6rem",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                Start Adding up to 8 Images
                <UploadButton handleImagePath={handleImagepath} />
                <span className="text-4xl">
                  <HiOutlinePlusCircle />
                </span>
              </Button>
            </div>
            // <Button
            //   className="self-center"
            //   component="label"
            //   role={undefined}
            //   variant="contained"
            //   tabIndex={-1}
            //   startIcon={<HiCloudUpload />}
            //   sx={{
            //     fontSize: "1rem",
            //     backgroundColor: "rgb(6 182 212)",
            //     "&:hover": {
            //       backgroundColor: "rgb(6 182 212)",
            //     },
            //   }}
            // >
            //   Upload Product Image
            //   <UploadButton handleImagePath={handleImagepath} />
            // </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ProductPage;

//  className=" flex-col items-center justify-between gap-12 text-center w-1/2 hidden md:flex  h-[60vh] "
