"use client";

import useDebounceHook from "@/hooks/useDebounceHook";
import {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
} from "@/lib/features/api/categoriesApi";
import {
  useGetSingleProductByIDQuery,
  useUpdateSingleProductMutation,
} from "@/lib/features/api/productsApi";
import { useGetSubCategoryQuery } from "@/lib/features/api/subCategoriesApi";
import { getAddProductServerData, getSumFrom } from "@/lib/helpers";
import { AdminProductProps } from "@/types/types";
import AddProductImage from "@/ui/AddProductImage/AddProductImage";
import BaseColorPicker from "@/ui/BaseColorPicker/BaseColorPicker";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import MultiChoiceSelectMenu from "@/ui/MultiChoiceSelectMenu/MultiChoiceSelectMenu";
import SmartSearchInput from "@/ui/SmartSearchInput/SmartSearchInput";
import SmartSearchMultipleInput from "@/ui/SmartSearchMultipleInput/SmartSearchMultipleInput";
import Spinner from "@/ui/Spinner/Spinner";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Box, Button, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { HiChevronRight } from "react-icons/hi2";

function EditProduct() {
  const params = useParams();

  const { locale } = useParams();

  const router = useRouter();

  const { data: productDetails } = useGetSingleProductByIDQuery(params.id);

  const currentProduct = productDetails?.data;

  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AdminProductProps>({
    mode: "onChange",
  });

  const formData = watch();


  const [updateProductFn, updateProductResponse] =
    useUpdateSingleProductMutation();

  const [smartSeachvalue, setSmartSeachValue] = useState<{
    id: string;
    name: string;
  }>({ id: "", name: "" });

  const [smartSeachSubCategoryvalue, setSmartSeachSubCategoryValue] =
    useState<string>("");

  const mainCategorydebounceValue = useDebounceHook(smartSeachvalue.name);

  const subCategorydebounceValue = useDebounceHook(smartSeachSubCategoryvalue);

  const { data: AllCategories } = useGetAllCategoriesQuery("categories");

  const { data: mainCategory } = useGetCategoryQuery(
    mainCategorydebounceValue,
    { skip: !mainCategorydebounceValue }
  );

  const { data: subCategory } = useGetSubCategoryQuery(
    {
      letter: subCategorydebounceValue,
      categoryId: smartSeachvalue["_id"],
    },
    { skip: !subCategorydebounceValue }
  );

  useEffect(() => {
    if (currentProduct?.images) {
      const images = {};
      if (currentProduct.images.length >= 1) {
        for (let i = 0; i < currentProduct.images.length; i++) {
          const image = currentProduct?.images?.[i];
          if (image) {
            images[`image-${i + 1}`] = {
              url: image?.url,
              id: image?.id,
            };
          }
        }
      }
      setValue("images", images);
    } else {
      for (let image in formData["images"]) {
        formData["images"][image] = undefined;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProduct?.images, setValue]);

  useEffect(() => {
    const discount: number =
      +formData.price - (+formData.price * +formData.discount) / 100;

    if (!discount) return;

    setValue("salePrice", discount);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.price, formData.discount]);

  const tIndex = useTranslations("Index");

  const t = useTranslations("Dashboard");

  function onSubmit(data: AdminProductProps) {
    const myData = { ...data, category: smartSeachvalue["_id"] };

    const serverData = getAddProductServerData(myData);

    const formDataImagesLength = Object.values(data.images)[0];

    if (!formDataImagesLength) {
      toast.error("You Have to add The main image");
      return;
    }

    updateProductFn({ id: currentProduct?.["_id"], data: serverData })
      .unwrap()
      .then(() => {
        toast.success("Product is updated");
        router.push(`/${locale}/admin/dashboard/products`);
        reset({
          name: "",
          price: 0,
          description: "",
          colors: [],
          images: {},
          subCategory: "",
          quantity: 0,
          size: [],
          discount: 0,
        });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  if (!AllCategories || !productDetails || !currentProduct.colors)
    return <Spinner />;

  const noCategoriesYet = AllCategories?.data?.length === 0;

  if (noCategoriesYet) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "4rem",
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        {t("No categories yet, please add a new category")}{" "}
        <Link
          href={`/${locale}/admin/dashboard/categories/add`}
          style={{ color: "#5b93ff", textDecoration: "underline" }}
        >
          {t("Add New Category")}
        </Link>
      </Box>
    );
  }

  const getQuantityValue = () => {
    if (!formData[`colors-quantity`]) return 0;
    return getSumFrom(formData["colors"], formData["colors-quantity"]);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex flex-col gap-8 px-[4rem] py-[1.2rem] bg-[#FDFDFD]  "
    >
      <Box className="h-[10vh] flex justify-between items-center">
        <Box className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold  text-gray-600">
            {t("Edit Product")}
          </h2>
          <Box className="flex items-center gap-4 text-[1.4rem]">
            <Link className="text-[#ed0534]" href="/">
              {tIndex("Home")}
            </Link>
            <span>
              <HiChevronRight />
            </span>
            <h4>{t("Products")}</h4>
          </Box>
        </Box>
        <Button
          sx={{
            paddingInline: "1.6rem",
            paddingBlock: "1rem",
            fontSize: "1.3rem",
            borderRadius: "5px",
            backgroundColor: "#ed0534",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "gray",
              boxShadow: "none",
            },
          }}
          type="button"
          variant="contained"
          size="large"
        >
          {tIndex("View All")}
        </Button>
      </Box>
      <Box className="relative grow flex flex-col gap-8 bg-white rounded-2xl border-2 p-10 border-slate-100 shadow-md">
        <Box className="mb-4">
          <h2 className="text-3xl font-semibold mb-5">{t("Edit Product")}</h2>
          <span className=" absolute left-0 block h-[1px] w-full bg-gray-200">
            &nbsp;
          </span>
        </Box>

        <Box className="flex gap-8 flex-col lg:flex-row justify-between ">
          <Box className="w-full lg:w-[70%] ">
            <Box className="relative grid grid-cols-autofill-minmax gap-12">
              <Controller
                name={"category"}
                control={control}
                defaultValue={""}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <SmartSearchInput
                    errors={errors}
                    disabled={updateProductResponse.isLoading}
                    shouldReset={updateProductResponse.isSuccess}
                    getSmartSearchValue={setSmartSeachValue}
                    textLabel={t("Main Category")}
                    data={mainCategory?.data}
                    placeholder={t("main category placeholder")}
                    name={field.name}
                    value={currentProduct?.category}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name={"subCategory"}
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <SmartSearchMultipleInput
                    existedItems={currentProduct?.subCategory}
                    shouldReset={
                      updateProductResponse.isSuccess ||
                      (formData.category === "" && smartSeachvalue.name === "")
                    }
                    disabled={
                      updateProductResponse.isLoading ||
                      smartSeachvalue.name === ""
                    }
                    getSmartSearchValue={setSmartSeachSubCategoryValue}
                    textLabel={t("Sub Category")}
                    data={subCategory?.data}
                    placeholder={t("sub category placeholder")}
                    name={field.name}
                    onChange={field.onChange}
                  />
                )}
              />
              <Box className="col-span-full">
                <Controller
                  name={"name"}
                  control={control}
                  rules={{ required: "This field is required" }}
                  defaultValue={currentProduct?.name}
                  render={({ field }) => (
                    <CustomizedTextField
                      disabled={updateProductResponse.isLoading}
                      textLabelClass={"font-semibold text-xl"}
                      placeholder={t("Product Name")}
                      textlabel={t("Product Name")}
                      field={field}
                      formerHelperStyles={{ style: { fontSize: "1rem" } }}
                      errors={errors}
                      type={"text"}
                      variant={"outlined"}
                      size={"small"}
                    />
                  )}
                />
              </Box>
              <Box className="relative col-span-full">
                <Controller
                  name={"colors"}
                  defaultValue={currentProduct?.colors}
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <BaseColorPicker
                      existedColors={currentProduct?.colors}
                      onChange={field.onChange}
                      disabled={updateProductResponse.isLoading}
                      isMulti={true}
                      textLabelClass={"font-semibold text-xl"}
                      placeholder={t("Product Colors")}
                      textLabel={t("Product Colors")}
                      name={"colors"}
                      field={field}
                      errors={errors}
                    />
                  )}
                />
              </Box>
              <Box className="relative col-span-full flex gap-2 items-center">
                {formData.colors?.map((color) => {
                  return (
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      gap={1}
                      key={color.label}
                    >
                      <Box
                        sx={{
                          width: "30px",
                          height: "30px",
                          background: color.value,
                          borderRadius: "50%",
                          border: "1px solid #000",
                        }}
                      ></Box>
                      <Controller
                        name={`colors-quantity.${color.label}`}
                        control={control}
                        defaultValue={color.quantity}
                        rules={{
                          required: "This field is required",
                          min: {
                            value: 1,
                            message: "",
                          },
                        }}
                        render={({ field }) => (
                          <CustomizedTextField
                            disabled={updateProductResponse.isLoading}
                            textLabelClass={"font-semibold text-xl"}
                            placeholder={t("quantity")}
                            field={field}
                            formerHelperStyles={{ style: { fontSize: "1rem" } }}
                            // errors={errors}
                            customError={
                              errors?.["colors-quantity"]?.[color.label]
                            }
                            type={"number"}
                            variant={"outlined"}
                            size={"small"}
                            mainContainerSx={{
                              width: "8rem",
                            }}
                          />
                        )}
                      />
                    </Stack>
                  );
                })}
              </Box>
              <Controller
                name={"size"}
                control={control}
                defaultValue={currentProduct?.size}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <MultiChoiceSelectMenu
                    disabled={updateProductResponse.isLoading}
                    readOnly={!!currentProduct?.size}
                    isMulti={false}
                    textLabelClass={"font-semibold text-xl"}
                    placeholder={t("Product Sizes")}
                    textLabel={t("Product Sizes")}
                    name={"size"}
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
                name={"quantity"}
                control={control}
                defaultValue={currentProduct?.quantity}
                rules={{
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "Quantity should be more than 1",
                  },
                }}
                render={({ field }) => (
                  <CustomizedTextField
                    inputProps={{ readOnly: true, disabled: true }}
                    disabled={updateProductResponse.isLoading}
                    textLabelClass={"font-semibold text-xl"}
                    placeholder={t("Product Quantity")}
                    textlabel={t("Product Quantity")}
                    value={getQuantityValue()}
                    formerHelperStyles={{ style: { fontSize: "1rem" } }}
                    errors={errors}
                    type={"number"}
                    variant={"outlined"}
                    size={"small"}
                  />
                )}
              />
              <Controller
                name={"price"}
                control={control}
                defaultValue={currentProduct?.price}
                rules={{
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "The Price should be more than 1 ",
                  },
                }}
                render={({ field }) => (
                  <CustomizedTextField
                    disabled={updateProductResponse.isLoading}
                    textLabelClass={"font-semibold text-xl"}
                    placeholder={t("Product Price")}
                    textlabel={t("Product Price")}
                    field={field}
                    formerHelperStyles={{ style: { fontSize: "1rem" } }}
                    errors={errors}
                    type={"number"}
                    variant={"outlined"}
                    size={"small"}
                  />
                )}
              />
              <Controller
                name={"discount"}
                control={control}
                defaultValue={currentProduct?.discount}
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
                    disabled={updateProductResponse.isLoading}
                    textLabelClass={"font-semibold text-xl"}
                    placeholder={t("Product Discount %")}
                    textlabel={t("Product Discount %")}
                    field={field}
                    formerHelperStyles={{ style: { fontSize: "1rem" } }}
                    errors={errors}
                    type={"number"}
                    variant={"outlined"}
                    size={"small"}
                  />
                )}
              />
              <Controller
                name={"salePrice"}
                defaultValue={0}
                control={control}
                rules={{
                  required: "This field is required",
                }}
                render={({ field }) => (
                  <CustomizedTextField
                    disabled={updateProductResponse.isLoading}
                    textLabelClass={"font-semibold text-xl"}
                    placeholder={t("Product Sale Price")}
                    textlabel={t("Product Sale Price")}
                    field={field}
                    formerHelperStyles={{ style: { fontSize: "1rem" } }}
                    errors={errors}
                    inputProps={{ readOnly: true, disabled: true }}
                    type={"number"}
                    variant={"outlined"}
                    size={"small"}
                  />
                )}
              />
              <Box className="col-span-full">
                <Controller
                  name={"description"}
                  control={control}
                  rules={{ required: "This field is required" }}
                  defaultValue={currentProduct?.description}
                  render={({ field }) => (
                    <CustomizedTextField
                      disabled={updateProductResponse.isLoading}
                      textLabelClass={"font-semibold text-xl"}
                      placeholder={t("Product Description")}
                      textlabel={t("Product Description")}
                      field={field}
                      formerHelperStyles={{ style: { fontSize: "1rem" } }}
                      errors={errors}
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
          <Box className="grow text-center">
            <AddProductImage
              disabled={updateProductResponse.isLoading}
              control={control}
              formData={formData}
              imagesNumber={3}
              setValue={setValue}
            />
          </Box>
        </Box>
        <Box>
          <Button
            disabled={updateProductResponse.isLoading}
            sx={{
              paddingInline: "1.6rem",
              paddingBlock: "1rem",
              fontSize: "1.3rem",
              borderRadius: "5px",
              backgroundColor: "#ed0534",
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
            {updateProductResponse.isLoading ? (
              <MiniSpinner />
            ) : (
              t("Edit Product")
            )}
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default EditProduct;
