"use client";

import ProductFormInputsSwitch from "@/components/AdminProduct/ProductFormInputsSwitch";
import productFormInputs from "@/constants/productFormInputs";
import { useAppSelector } from "@/lib/hooks";
import { AdminProductProps } from "@/types/types";
import AddProductImage from "@/ui/AddProductImage/AddProductImage";
import ColorPickerInput from "@/ui/ColorPicketInput/ColorPickerInput";
import MultiChoiceSelectMenu from "@/ui/MultiChoiceSelectMenu/MultiChoiceSelectMenu";
import CustomizedTextField from "@/ui/TextField/TextField";
import { DisabledByDefault } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { HiChevronRight } from "react-icons/hi2";

function ProductPage() {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useForm<AdminProductProps>({
    mode: "onChange",
  });

  function onSubmit(data: AdminProductProps) {
    // reset();
  }

  const [colorsOption, setColorOptions] = useState<
    {
      value: string;
      label: string;
      color: string;
    }[]
  >([{ value: "Black", label: "Black", color: "#000000" }]);

  const formData = watch();

  console.log("formData", formData);

  const t = useTranslations("Dashboard");

  useEffect(() => {
    const discount: number =
      +formData.productPrice -
      (+formData.productPrice * +formData.productDiscount) / 100;

    console.log("DISCOUNT", discount);

    if (discount === 0 || !discount) return;

    setValue("productSalePrice", discount);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.productPrice, formData.productDiscount]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex flex-col gap-8 px-[4rem] py-[1.2rem] bg-[#FDFDFD]  "
    >
      <Box
        component="div"
        className="h-[10vh] flex justify-between items-center"
      >
        <Box component="div" className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold  text-gray-600">Add Product</h2>
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
          <h2 className="text-3xl font-semibold mb-5">{t("Add Product")}</h2>
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
              className="relative grid grid-cols-autofill-minmax items-center gap-12"
            >
              <Controller
                name={"productName"}
                control={control}
                defaultValue={""}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <CustomizedTextField
                    textLabelClass={"font-semibold text-xl"}
                    placeholder={"Product Name"}
                    textlabel={"Product Name"}
                    field={field}
                    error={!!errors["productName"]}
                    formerHelperStyles={{ style: { fontSize: "1rem" } }}
                    helperText={
                      errors["productName"] ? errors["productName"].message : ""
                    }
                    type={"text"}
                    variant={"outlined"}
                    size={"small"}
                  />
                )}
              />
              <Box className="relative">
                <Controller
                  name={"productColors"}
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <MultiChoiceSelectMenu
                      isMulti={true}
                      textLabelClass={"font-semibold text-xl"}
                      placeholder={"Product Colors"}
                      textLabel={"Product Colors"}
                      name={"productColors"}
                      options={colorsOption}
                      field={field}
                      errors={errors}
                    />
                  )}
                />
                <ColorPickerInput
                  colorsOption={colorsOption}
                  setColorOptions={setColorOptions}
                />
              </Box>
              <Controller
                name={"productSizes"}
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <MultiChoiceSelectMenu
                    isMulti={false}
                    textLabelClass={"font-semibold text-xl"}
                    placeholder={"Product Sizes"}
                    textLabel={"Product Sizes"}
                    name={"productSizes"}
                    options={[
                      { value: "XS", label: "XS", color: "#666666" },
                      { value: "SM", label: "SM", color: "#666666" },
                      { value: "L", label: "L", color: "#666666" },
                      { value: "Xl", label: "Xl", color: "#666666" },
                      { value: "XXl", label: "XXl", color: "#666666" },
                      { value: "XXXl", label: "XXXl", color: "#666666" },
                    ]}
                    field={field}
                    errors={errors}
                  />
                )}
              />
              <Controller
                name={"productQuantity"}
                control={control}
                defaultValue={0}
                rules={{
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "Quantity should be more than 1",
                  },
                }}
                render={({ field }) => (
                  <CustomizedTextField
                    textLabelClass={"font-semibold text-xl"}
                    placeholder={"Product Quantity"}
                    textlabel={"Product Quantity"}
                    field={field}
                    error={!!errors["productQuantity"]}
                    formerHelperStyles={{ style: { fontSize: "1rem" } }}
                    helperText={
                      errors["productQuantity"]
                        ? errors["productQuantity"].message
                        : ""
                    }
                    type={"number"}
                    variant={"outlined"}
                    size={"small"}
                  />
                )}
              />
              <Controller
                name={"productPrice"}
                control={control}
                defaultValue={0}
                rules={{
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "The Price should be more than 1 ",
                  },
                }}
                render={({ field }) => (
                  <CustomizedTextField
                    textLabelClass={"font-semibold text-xl"}
                    placeholder={"Product Price"}
                    textlabel={"Product Price"}
                    field={field}
                    error={!!errors["productPrice"]}
                    formerHelperStyles={{ style: { fontSize: "1rem" } }}
                    helperText={
                      errors["productPrice"]
                        ? errors["productPrice"].message
                        : ""
                    }
                    type={"number"}
                    variant={"outlined"}
                    size={"small"}
                  />
                )}
              />
              <Controller
                name={"productDiscount"}
                control={control}
                defaultValue={0}
                rules={{
                  min: {
                    value: 0,
                    message: "This field should be more than 0 ",
                  },
                  max: {
                    value: 99,
                    message: "This field should be less than 100 % ",
                  },
                }}
                render={({ field }) => (
                  <CustomizedTextField
                    textLabelClass={"font-semibold text-xl"}
                    placeholder={"Product Discount %"}
                    textlabel={"Product Discount %"}
                    field={field}
                    error={!!errors["productDiscount"]}
                    formerHelperStyles={{ style: { fontSize: "1rem" } }}
                    helperText={
                      errors["productDiscount"]
                        ? errors["productDiscount"].message
                        : ""
                    }
                    type={"number"}
                    variant={"outlined"}
                    size={"small"}
                  />
                )}
              />
              <Controller
                name={"productSalePrice"}
                defaultValue={0}
                control={control}
                rules={{
                  required: "This field is required",
                  min: {
                    value: 0,
                    message: "This field should be more than 0 ",
                  },
                  max: {
                    value: +formData.productPrice,
                    message: "This field should be less than Product Price ",
                  },
                }}
                render={({ field }) => (
                  <CustomizedTextField
                    textLabelClass={"font-semibold text-xl"}
                    placeholder={"Product Sale Pirce"}
                    textlabel={"Product Sale Price"}
                    field={field}
                    error={!!errors["productSalePrice"]}
                    formerHelperStyles={{ style: { fontSize: "1rem" } }}
                    helperText={
                      errors["productSalePrice"]
                        ? errors["productSalePrice"].message
                        : ""
                    }
                    inputProps={{ readOnly: true }}
                    type={"number"}
                    variant={"outlined"}
                    size={"small"}
                  />
                )}
              />
              <Box className="col-span-full">
                <Controller
                  name={"productDescription"}
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <CustomizedTextField
                      textLabelClass={"font-semibold text-xl"}
                      placeholder={"Product Description"}
                      textlabel={"Product Description"}
                      field={field}
                      error={!!errors["productDescription"]}
                      formerHelperStyles={{ style: { fontSize: "1rem" } }}
                      helperText={
                        errors["productDescription"]
                          ? errors["productDescription"].message
                          : ""
                      }
                      type={"text"}
                      variant={"outlined"}
                      multiline={true}
                      rows={6}
                      sx={{
                        "& .MuiInputBase-input": {
                          fontSize: "1.4rem",
                        },
                        "& .MuiInputBase-inputMultiline": {
                          fontSize: "1.4rem",
                        },
                      }}
                    />
                  )}
                />
              </Box>
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
    </form>
  );
}

export default ProductPage;
// flex flex-col gap-[1.55rem]  md:gap-[2rem] w-full md:w-1/2
