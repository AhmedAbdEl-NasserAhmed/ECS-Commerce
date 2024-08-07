"use client";

import useDebounceHook from "@/hooks/useDebounceHook";
import {
  useGetAllCategoriesQuery,
  useGetCategoryQuery
} from "@/lib/features/api/categoriesApi";
import {
  useAddProductMutation,
  useGetProductByNameQuery
} from "@/lib/features/api/productsApi";
import { useGetSubCategoryQuery } from "@/lib/features/api/subCategoriesApi";
import { getAddProductServerData, getSumFrom } from "@/lib/helpers";
import { StorageService } from "@/services/StorageService";
import { Lang } from "@/types/enums";
import { AdminProductProps } from "@/types/types";
import AddProductImage from "@/ui/AddProductImage/AddProductImage";
import BaseColorPicker from "@/ui/BaseColorPicker/BaseColorPicker";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import MultiChoiceSelectMenu from "@/ui/MultiChoiceSelectMenu/MultiChoiceSelectMenu";
import SmartSearchInput from "@/ui/SmartSearchInput/SmartSearchInput";
import SmartSearchMultipleInput from "@/ui/SmartSearchMultipleInput/SmartSearchMultipleInput";
import Spinner from "@/ui/Spinner/Spinner";
import CustomizedTextField from "@/ui/TextField/TextField";
import {
  Box,
  Button,
  FormControlLabel,
  Stack,
  Switch,
  Typography
} from "@mui/material";
import { useTranslations } from "next-intl";
import { createKey } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { useParams } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { HiChevronRight } from "react-icons/hi2";

function AddProductPage() {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<AdminProductProps>({ mode: "onChange" });

  const { locale } = useParams();

  const formData = watch();

  const [lang, setLang] = useState("en");

  const [smartSeachvalue, setSmartSeachValue] = useState<{
    id: string;
    name: string;
  }>({ id: "", name: "" });

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [currentSubCategories, setCurrentSubCategories] = useState([]);
  useEffect(() => {
    if (localStorage !== undefined) {
      setCurrentSubCategories(
        JSON.parse(localStorage.getItem(`subCategories${lang}`))
      );
    }
  }, [lang]);

  const [smartSeachSubCategoryvalue, setSmartSeachSubCategoryValue] =
    useState<string>("");

  const mainCategorydebounceValue = useDebounceHook(smartSeachvalue.name);

  const subCategorydebounceValue = useDebounceHook(smartSeachSubCategoryvalue);

  const { data: AllCategories } = useGetAllCategoriesQuery("categories");

  const { data: mainCategory, isFetching: isFetchingMainCategory } =
    useGetCategoryQuery(
      { letter: mainCategorydebounceValue, lang },
      {
        skip: !mainCategorydebounceValue
      }
    );

  const { data: subCategory, isFetching: isFetchingSubCategories } =
    useGetSubCategoryQuery(
      {
        letter: subCategorydebounceValue,
        categoryId: smartSeachvalue["_id"],
        lang
      },
      { skip: !subCategorydebounceValue || !smartSeachvalue["_id"] }
    );

  const [allCategories, setAllCategories] = useState<string[]>([]);

  const [productSearchName, setProductSearchName] = useState<{
    name: string;
  }>({ name: "" });

  const productNameDebounceValue = useDebounceHook(productSearchName?.name);

  const { data: productName, isFetching: isFetchingProduct } =
    useGetProductByNameQuery(
      { letter: productNameDebounceValue, lang },
      {
        skip: !productNameDebounceValue
      }
    );

  const [addProductFn, productResponse] = useAddProductMutation();

  const [selectedProduct, setSelectedProduct] = useState({
    name: "",
    images: []
  });

  useEffect(() => {
    setSelectedProduct(
      productName?.find((product) => {
        return product.name === formData["name"];
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData["name"], productName]);

  function showInputsHandler(e) {
    setIsChecked(e.target.checked);
    if (formData.subCategory[lang].length > 0) {
      localStorage.setItem(
        `subCategories${lang}`,
        JSON.stringify([...formData.subCategory[lang]])
      );
    }
  }

  useEffect(() => {
    setLang(isChecked ? Lang.ARABIC : Lang.ENGLISH);
  }, [isChecked]);

  useEffect(() => {
    if (selectedProduct?.images) {
      const images = {};
      if (selectedProduct.images.length >= 1) {
        for (let i = 0; i < selectedProduct.images.length; i++) {
          const image = selectedProduct?.images?.[i];
          if (image) {
            images[`image-${i + 1}`] = {
              url: image?.url,
              id: image?.id
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
  }, [selectedProduct?.images, setValue]);

  useEffect(() => {
    const discount: number =
      +formData.price - (+formData.price * +formData.discount) / 100;

    if (!discount) return;

    setValue("salePrice", discount);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.price, formData.discount]);

  useEffect(() => {
    setAllCategories(mainCategory?.data.map((category) => category.name[lang]));
  }, [mainCategory?.data, lang]);

  const tIndex = useTranslations("Index");

  const t = useTranslations("Dashboard");

  function onSubmit(data: AdminProductProps) {
    const myData = { ...data, category: smartSeachvalue["_id"] };

    const serverData = getAddProductServerData(myData, lang);

    const formDataImagesLength = Object.values(data.images)[0];

    if (!formDataImagesLength) {
      toast.error("You Have to add The main image");
      return;
    }

    addProductFn(serverData)
      .unwrap()
      .then(() => {
        toast.success("A new Product is added");
        localStorage.removeItem("subCategoriesen");
        localStorage.removeItem("subCategoriesar");
        reset({
          category: {
            en: "",
            ar: ""
          },
          name: {
            en: "",
            ar: ""
          },
          price: 0,
          description: {
            en: "",
            ar: ""
          },
          colors: [],
          images: {},
          subCategory: {
            en: "",
            ar: ""
          },
          salePrice: 0,
          quantity: 0,
          size: [],
          discount: 0
        });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  if (!AllCategories) return <Spinner />;

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
          flexDirection: "column"
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
            {t("Add Product")}
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
      </Box>
      <Box className="relative grow flex flex-col gap-8 bg-white rounded-2xl border-2 p-10 border-slate-100 shadow-md">
        <Box className="mb-4 flex items-center justify-between">
          <h2 className="text-3xl font-semibold mb-5">{t("Add Product")}</h2>
          <FormControlLabel
            control={
              <Switch
                disabled={productResponse.isLoading}
                checked={isChecked}
                onChange={showInputsHandler}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "red",
                    "& + .MuiSwitch-track": {
                      backgroundColor: "#ed0534"
                    }
                  },
                  "& .MuiSwitch-track": {
                    backgroundColor: "#161616",
                    opacity: 1
                  }
                }}
              />
            }
            label={
              <Typography variant="h6">{`Show ${
                isChecked ? "English" : "Arabic"
              }  Inputs`}</Typography>
            }
          />
          <span className=" absolute left-0 top-28 block h-[1px] w-full bg-gray-200">
            &nbsp;
          </span>
        </Box>

        <Box className="flex gap-8 flex-col lg:flex-row justify-between ">
          <Box className="w-full lg:w-[70%] ">
            <Box className="relative grid grid-cols-autofill-minmax gap-12">
              {!isChecked && (
                <Controller
                  name={"category.en"}
                  control={control}
                  defaultValue={""}
                  rules={{
                    required: "This field is required",
                    validate(value) {
                      if (!allCategories?.includes(value))
                        return t(
                          "You Have to choose from available categories"
                        );
                    }
                  }}
                  render={({ field }) => (
                    <SmartSearchInput
                      lang={lang}
                      errors={errors?.["category"]?.["en"]}
                      defaultValue={formData.category?.en}
                      isFetching={isFetchingMainCategory}
                      notAvailableMessage="No Categories Available"
                      disabled={
                        productResponse.isLoading || isFetchingMainCategory
                      }
                      shouldReset={productResponse.isSuccess}
                      getSmartSearchValue={setSmartSeachValue}
                      textLabel={t("Main Category")}
                      data={mainCategory?.data}
                      placeholder={t("main category placeholder")}
                      name={field.name}
                      onChange={field.onChange}
                    />
                  )}
                />
              )}
              {isChecked && (
                <Controller
                  name={"category.ar"}
                  control={control}
                  defaultValue={""}
                  rules={{
                    required: "هذا الحقل مطلوب",
                    validate(value) {
                      if (!allCategories?.includes(value))
                        return "يجب الأختيار من الأقسام المتاحة";
                    }
                  }}
                  render={({ field }) => (
                    <SmartSearchInput
                      lang={lang}
                      errors={errors?.["category"]?.["ar"]}
                      defaultValue={formData.category?.ar}
                      isFetching={isFetchingMainCategory}
                      notAvailableMessage="لا توجد منتجات متاحه"
                      disabled={
                        productResponse.isLoading || isFetchingMainCategory
                      }
                      shouldReset={productResponse.isSuccess}
                      getSmartSearchValue={setSmartSeachValue}
                      textLabel={"القسم الرئيسي"}
                      data={mainCategory?.data}
                      placeholder={"ابحث عن القسم الرئيسي"}
                      name={field.name}
                      onChange={field.onChange}
                    />
                  )}
                />
              )}
              {!isChecked && (
                <Controller
                  name={"subCategory.en"}
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <SmartSearchMultipleInput
                      lang={lang}
                      isFetching={isFetchingSubCategories}
                      existedItems={currentSubCategories}
                      disabled={
                        productResponse.isLoading ||
                        !smartSeachvalue["_id"] ||
                        isFetchingSubCategories
                      }
                      shouldReset={
                        productResponse.isSuccess ||
                        (formData.category?.[lang] === "" &&
                          smartSeachvalue.name === "")
                      }
                      getSmartSearchValue={setSmartSeachSubCategoryValue}
                      textLabel={t("Collection")}
                      data={subCategory?.data}
                      placeholder={t("Collection placeholder")}
                      name={field.name}
                      onChange={field.onChange}
                    />
                  )}
                />
              )}
              {isChecked && (
                <Controller
                  name={"subCategory.ar"}
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <SmartSearchMultipleInput
                      lang={lang}
                      isFetching={isFetchingSubCategories}
                      existedItems={currentSubCategories}
                      disabled={
                        productResponse.isLoading ||
                        !smartSeachvalue["_id"] ||
                        isFetchingSubCategories
                      }
                      shouldReset={
                        productResponse.isSuccess ||
                        (formData.category?.[lang] === "" &&
                          smartSeachvalue.name === "")
                      }
                      getSmartSearchValue={setSmartSeachSubCategoryValue}
                      textLabel={"المحموعات"}
                      data={subCategory?.data}
                      placeholder={"ابحث في المجموعات"}
                      name={field.name}
                      onChange={field.onChange}
                    />
                  )}
                />
              )}
              {!isChecked && (
                <Box className="col-span-full">
                  <Controller
                    name={"name.en"}
                    control={control}
                    defaultValue={""}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <SmartSearchInput
                        lang={lang}
                        errors={errors?.["name"]?.["en"]}
                        defaultValue={formData.name?.en}
                        isFetching={isFetchingProduct}
                        notAvailableMessage="No Products Available But you can write a new Product Name"
                        disabled={
                          productResponse.isLoading || isFetchingProduct
                        }
                        shouldReset={productResponse.isSuccess}
                        getSmartSearchValue={setProductSearchName}
                        textLabel={t("Product Name")}
                        data={productName}
                        placeholder={t("Product Name")}
                        name={field.name}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </Box>
              )}
              {isChecked && (
                <Box className="col-span-full">
                  <Controller
                    name={"name.ar"}
                    control={control}
                    defaultValue={""}
                    rules={{ required: "هذا الحقل مطلوب" }}
                    render={({ field }) => (
                      <SmartSearchInput
                        lang={lang}
                        errors={errors?.["name"]?.["ar"]}
                        defaultValue={formData.name?.ar}
                        isFetching={isFetchingProduct}
                        notAvailableMessage="لا توجد منتجات متاحه لكن يمكن كتابة اسم منتج"
                        disabled={
                          productResponse.isLoading || isFetchingProduct
                        }
                        shouldReset={productResponse.isSuccess}
                        getSmartSearchValue={setProductSearchName}
                        textLabel={"اسم المنتج"}
                        data={productName}
                        placeholder={"اسم المنتج"}
                        name={field.name}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </Box>
              )}
              {!isChecked && (
                <Box className="relative col-span-full">
                  <Controller
                    name={"colors"}
                    defaultValue={[]}
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <BaseColorPicker
                        existedColors={[]}
                        onChange={field.onChange}
                        disabled={productResponse.isLoading}
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
              )}

              {!isChecked && (
                <Box className="relative col-span-full flex flex-wrap  gap-4 items-center">
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
                            border: "1px solid #000"
                          }}
                        ></Box>
                        <Controller
                          name={`colors-quantity.${color.label}`}
                          control={control}
                          defaultValue={0}
                          rules={{
                            required: "This field is required",
                            min: {
                              value: 1,
                              message: "Quantity should be more than 1"
                            }
                          }}
                          render={({ field }) => (
                            <CustomizedTextField
                              disabled={productResponse.isLoading}
                              textLabelClass={"font-semibold text-xl"}
                              placeholder={t("quantity")}
                              field={field}
                              formerHelperStyles={{
                                style: { fontSize: "1rem" }
                              }}
                              customError={
                                errors?.["colors-quantity"]?.[color.label]
                              }
                              type={"number"}
                              variant={"outlined"}
                              size={"small"}
                              mainContainerSx={{
                                width: "8rem"
                              }}
                            />
                          )}
                        />
                      </Stack>
                    );
                  })}
                </Box>
              )}
              {!isChecked && (
                <Controller
                  name={"size"}
                  control={control}
                  defaultValue={[]}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <MultiChoiceSelectMenu
                      disabled={productResponse.isLoading}
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
                        { value: "XXXl", label: "XXXl", color: "#666666" }
                      ]}
                      field={field}
                      errors={errors}
                    />
                  )}
                />
              )}
              {!isChecked && (
                <CustomizedTextField
                  name={"quantity"}
                  disabled={true}
                  inputProps={{ readOnly: true, disabled: true }}
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
              {!isChecked && (
                <Controller
                  name={"price"}
                  control={control}
                  defaultValue={0}
                  rules={{
                    required: "This field is required",
                    min: {
                      value: 1,
                      message: "The Price should be more than 1 "
                    }
                  }}
                  render={({ field }) => (
                    <CustomizedTextField
                      disabled={productResponse.isLoading}
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
              )}
              {!isChecked && (
                <Controller
                  name={"discount"}
                  control={control}
                  defaultValue={0}
                  rules={{
                    min: {
                      value: 0,
                      message: "This field should be more than 0 "
                    },
                    max: {
                      value: 99,
                      message: "This field should be less than 100 % "
                    }
                  }}
                  render={({ field }) => (
                    <CustomizedTextField
                      disabled={productResponse.isLoading}
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
              )}
              {!isChecked && (
                <Controller
                  name={"salePrice"}
                  defaultValue={0}
                  control={control}
                  rules={{
                    required: "This field is required"
                  }}
                  render={({ field }) => (
                    <CustomizedTextField
                      disabled={productResponse.isLoading}
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
              )}
              {!isChecked && (
                <Box className="col-span-full">
                  <Controller
                    name={"description.en"}
                    control={control}
                    rules={{ required: "This field is required" }}
                    defaultValue=""
                    render={({ field }) => (
                      <CustomizedTextField
                        disabled={productResponse.isLoading}
                        textLabelClass={"font-semibold text-xl"}
                        placeholder={t("Product Description")}
                        textlabel={t("Product Description")}
                        field={field}
                        formerHelperStyles={{ style: { fontSize: "1rem" } }}
                        customError={errors?.["description"]?.["en"]}
                        type={"text"}
                        variant={"outlined"}
                        multiline={true}
                        rows={6}
                        sx={{
                          "& .MuiInputBase-input": {
                            fontSize: "1.4rem",
                            lineHeight: "2.4rem"
                          },
                          "& .MuiInputBase-inputMultiline": {
                            fontSize: "1.4rem",
                            lineHeight: "2.4rem"
                          }
                        }}
                      />
                    )}
                  />
                </Box>
              )}
              {isChecked && (
                <Box className="col-span-full">
                  <Controller
                    name={"description.ar"}
                    control={control}
                    rules={{ required: "هذا الحقل مطلوب" }}
                    defaultValue=""
                    render={({ field }) => (
                      <CustomizedTextField
                        disabled={productResponse.isLoading}
                        textLabelClass={"font-semibold text-xl"}
                        textlabel={"وصف المنتج"}
                        placeholder={"وصف المنتج"}
                        field={field}
                        formerHelperStyles={{ style: { fontSize: "1rem" } }}
                        customError={errors?.["description"]?.["ar"]}
                        type={"text"}
                        variant={"outlined"}
                        multiline={true}
                        rows={6}
                        sx={{
                          "& .MuiInputBase-input": {
                            fontSize: "1.4rem",
                            lineHeight: "2.4rem"
                          },
                          "& .MuiInputBase-inputMultiline": {
                            fontSize: "1.4rem",
                            lineHeight: "2.4rem"
                          }
                        }}
                      />
                    )}
                  />
                </Box>
              )}
            </Box>
          </Box>
          {!isChecked && (
            <Box className="grow text-center">
              <AddProductImage
                disabled={productResponse.isLoading}
                control={control}
                formData={formData}
                imagesNumber={3}
                setValue={setValue}
              />
            </Box>
          )}
        </Box>
        {formData.category?.ar &&
          formData.category?.ar !== "" &&
          formData.name?.ar &&
          formData.name?.ar !== "" &&
          formData.description?.ar &&
          formData.description?.ar !== "" &&
          !isChecked && (
            <Box>
              <Button
                disabled={productResponse.isLoading}
                sx={{
                  paddingInline: "1.6rem",
                  paddingBlock: "1rem",
                  fontSize: "1.3rem",
                  borderRadius: "5px",
                  backgroundColor: "#ed0534",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "black",
                    boxShadow: "none"
                  }
                }}
                type="submit"
                variant="contained"
                size="large"
              >
                {productResponse.isLoading ? <MiniSpinner /> : t("Add Product")}
              </Button>
            </Box>
          )}
      </Box>
    </form>
  );
}

export default AddProductPage;
