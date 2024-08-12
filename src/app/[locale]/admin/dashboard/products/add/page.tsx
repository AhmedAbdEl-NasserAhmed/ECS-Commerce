"use client";

import useDebounceHook from "@/hooks/useDebounceHook";
import {
  setImages,
  setSubCategory,
} from "@/lib/features/adminProductSlice/adminProductSlice";
import {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
} from "@/lib/features/api/categoriesApi";
import {
  useAddProductMutation,
  useGetProductByNameQuery,
} from "@/lib/features/api/productsApi";
import { useGetSubCategoryQuery } from "@/lib/features/api/subCategoriesApi";
import { getAddProductServerData, getSumFrom } from "@/lib/helpers";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { sizes } from "@/lib/StaticLookups";
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
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { createKey } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { HiChevronRight } from "react-icons/hi2";

let shouldResetMultipleSearchInputTimer = null;
let shouldResetMainCategoryTimer = null;

function AddProductPage() {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<AdminProductProps>({ mode: "onChange" });

  const { locale } = useParams();

  const formData = watch();

  const router = useRouter();

  const [smartSeachvalue, setSmartSeachValue] = useState<{
    id: string;
    name: string;
  }>({ id: "", name: "" });

  const [shouldResetMultipleSearchInput, setShouldResetMultipleSearchInput] =
    useState(false);

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const lang = isChecked ? "ar" : "en";

  const [currentSubCategories, setCurrentSubCategories] = useState([]);
  useEffect(() => {
    if (localStorage !== undefined) {
      setCurrentSubCategories(
        adminProduct.subCategory
        // JSON.parse(localStorage.getItem(`subCategories${lang}`))
      );
    }
    if (adminProduct.images.length > 0) {
      setValue("images", adminProduct.images);
    }
  }, [lang]);

  const [smartSeachSubCategoryvalue, setSmartSeachSubCategoryValue] =
    useState<string>("");

  const mainCategorydebounceValue = useDebounceHook(smartSeachvalue?.name);

  const subCategorydebounceValue = useDebounceHook(smartSeachSubCategoryvalue);

  const { data: AllCategories } = useGetAllCategoriesQuery("categories");

  const [doesUserRemovedCategory, setDoesUserRemovedCategory] = useState(false);

  const { data: mainCategory, isFetching: isFetchingMainCategory } =
    useGetCategoryQuery(
      { letter: mainCategorydebounceValue, lang: locale },
      {
        skip: !mainCategorydebounceValue,
      }
    );
  const [allCategories, setAllCategories] = useState<string[]>([]);

  const [productSearchName, setProductSearchName] = useState(null);
  const [shouldUpdateCategoryValue, setShowUpdateCategoryValue] =
    useState(false);

  const {
    data: subCategory,
    isFetching: isFetchingSubCategories,
    refetch,
  } = useGetSubCategoryQuery(
    {
      letter: subCategorydebounceValue,
      categoryId: smartSeachvalue["_id"] || productSearchName?.category,
      lang: locale,
    },
    {
      skip:
        !subCategorydebounceValue ||
        (!smartSeachvalue["_id"] && !productSearchName?.category),
    }
  );

  const productNameDebounceValue = useDebounceHook(productSearchName?.name);

  const { data: productName, isFetching: isFetchingProduct } =
    useGetProductByNameQuery(
      { letter: productNameDebounceValue, lang },
      {
        skip: !productNameDebounceValue,
      }
    );

  useEffect(() => {
    if (productSearchName?._id) {
      const searchedProductByNameCategoryValue = doesUserRemovedCategory
        ? formData?.category
        : productSearchName
        ? AllCategories?.data?.find((c) => c._id === productSearchName.category)
            ?.name
        : null;

      if (searchedProductByNameCategoryValue) {
        setValue("category", searchedProductByNameCategoryValue);
        clearErrors("category");
      }
      setValue("price", productSearchName.price);
      setValue("discount", productSearchName.discount);
      setValue("description.en", productSearchName.description?.en);
      setValue("description.ar", productSearchName.description?.ar);
      setShowUpdateCategoryValue(true);
    }
  }, [AllCategories, doesUserRemovedCategory, productSearchName]);

  const [addProductFn, productResponse] = useAddProductMutation();

  const [selectedProduct, setSelectedProduct] = useState({
    name: "",
    images: [],
  });

  const nameEnValue =
    typeof formData?.["name-en"] === "string"
      ? formData?.["name-en"]
      : formData?.["name-en"]?.en;

  const nameArValue =
    typeof formData?.["name-ar"] === "string"
      ? formData?.["name-ar"]
      : formData?.["name-ar"]?.ar;

  useEffect(() => {
    setSelectedProduct(
      productName?.find((product) => {
        return product.name.en === nameEnValue;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData["name"], productName]);

  const adminProduct = useAppSelector((store) => store.adminProductSlice);
  const shouldMainCategoryReset = useRef(false);

  const dispatch = useAppDispatch();

  function showInputsHandler(e) {
    setIsChecked(e.target.checked);
    if (formData.subCategory?.length > 0) {
      dispatch(setSubCategory({ data: formData.subCategory }));
      if (Object.values(formData.images).filter(Boolean)) {
        dispatch(setImages({ data: { ...formData.images } }));
      }
    }
  }

  useEffect(() => {
    if (selectedProduct?.images) {
      const images = {};
      if (selectedProduct.images.length >= 1) {
        for (let i = 0; i < selectedProduct.images.length; i++) {
          const image = selectedProduct?.images?.[i];
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
  }, [selectedProduct?.images, setValue]);

  useEffect(() => {
    const p = +(formData.price || 0);
    const d = +(formData.discount || 0);
    const discount: number = +p - (+p * +d) / 100;

    setValue("salePrice", discount);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.price, formData.discount]);

  useEffect(() => {
    setAllCategories(
      mainCategory?.data.map((category) => {
        return category.name?.[locale as string];
      })
    );
  }, [mainCategory?.data, lang]);

  useEffect(() => {
    if (
      !shouldMainCategoryReset.current &&
      typeof formData?.["name-en"] === "object" &&
      typeof formData?.["name-ar"] !== "object"
    ) {
      setValue("name-ar", formData?.["name-en"]);
    }
  }, [shouldMainCategoryReset.current, formData?.["name-en"]]);

  useEffect(() => {
    if (
      !shouldMainCategoryReset.current &&
      typeof formData?.["name-ar"] === "object" &&
      typeof formData?.["name-en"] !== "object"
    ) {
      setValue("name-en", formData?.["name-ar"]);
    }
  }, [shouldMainCategoryReset.current, formData?.["name-ar"]]);

  const tIndex = useTranslations("Index");
  const tMessage = useTranslations("messages");

  const t = useTranslations("Dashboard");

  function onSubmit(data: AdminProductProps) {
    if (
      formData.colors?.length === 0 ||
      !formData.category.en ||
      !formData["name-en"] ||
      !formData["name-ar"] ||
      !formData.description.en ||
      !formData.description.ar
    ) {
      toast.error(tMessage("Please check form inputs"));
      return;
    }
    const myData = {
      ...data,
      category: smartSeachvalue["_id"] || productSearchName?.category,
    };

    const serverData = getAddProductServerData(myData, lang);

    const formDataImagesLength = Object.values(data.images)[0];

    if (!formDataImagesLength) {
      toast.error(tMessage("You Have to add The main image"));
      return;
    }

    addProductFn(serverData)
      .unwrap()
      .then(() => {
        toast.success(tMessage("A new Product is added"));
        localStorage.removeItem("subCategoriesen");
        localStorage.removeItem("subCategoriesar");
        setIsChecked(false);
        router.replace(`/${locale}/admin/dashboard/products`);
        reset({
          category: {
            en: "",
            ar: "",
          },
          ["name-en"]: {
            en: "",
            ar: "",
          },
          ["name-ar"]: {
            en: "",
            ar: "",
          },
          price: 0,
          description: {
            en: "",
            ar: "",
          },
          colors: [],
          images: {},
          subCategory: [],
          salePrice: 0,
          quantity: 0,
          size: [],
          discount: 0,
        });
      })
      .catch((err) => {
        toast.error(tMessage(err.message));
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

  const onRemoveMainCategory = () => {
    setDoesUserRemovedCategory(true);
    if (shouldResetMultipleSearchInputTimer)
      clearTimeout(shouldResetMultipleSearchInputTimer);

    dispatch(setSubCategory({ data: [] }));
    setValue("subCategory", []);
    setValue("category", { en: "", ar: "" });
    setShouldResetMultipleSearchInput(true);
    shouldResetMultipleSearchInputTimer = setTimeout(() => {
      setShouldResetMultipleSearchInput(false);
    }, 100);
  };

  function onRemoveProductName() {
    if (!productSearchName?._id) return; // this make sure that we didn't select a name from the list
    if (shouldResetMainCategoryTimer)
      clearTimeout(shouldResetMainCategoryTimer);
    setShowUpdateCategoryValue(false);
    reset();
    setValue("name-en", "");
    setValue("name-ar", "");
    setValue("description.en", "");
    setValue("description.ar", "");
    setValue("colors", []);
    setValue("price", 0);
    setValue("subCategory", []);
    setValue("category", { en: "", ar: "" });
    shouldMainCategoryReset.current = true;
    shouldResetMainCategoryTimer = setTimeout(() => {
      shouldMainCategoryReset.current = false;
    }, 100);
  }

  const _sizes = sizes.filter((s) => s.value != productSearchName?.size?.value);

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
            <Link
              className="text-[#ed0534]"
              href={`/${locale}/admin/dashboard`}
            >
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
                      backgroundColor: "#ed0534",
                    },
                  },
                  "& .MuiSwitch-track": {
                    backgroundColor: "#161616",
                    opacity: 1,
                  },
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
                  name={"category"}
                  control={control}
                  defaultValue={{ en: "", ar: "" }}
                  rules={{
                    required: "This field is required",
                    validate(value) {
                      if (!allCategories?.includes(value[locale as string]))
                        return t(
                          "You Have to choose from available categories"
                        );
                    },
                  }}
                  render={({ field }) => (
                    <SmartSearchInput
                      shouldUpdateValue={shouldUpdateCategoryValue}
                      onRemove={onRemoveMainCategory}
                      lang={locale}
                      errors={errors?.["category"]}
                      defaultValue={formData.category?.[locale as string]}
                      isFetching={isFetchingMainCategory}
                      notAvailableMessage={tMessage("No Categories Available")}
                      disabled={
                        productResponse.isLoading || isFetchingMainCategory
                      }
                      shouldReset={
                        shouldMainCategoryReset.current ||
                        productResponse.isSuccess
                      }
                      getSmartSearchValue={setSmartSeachValue}
                      textLabel={t("Main Category")}
                      data={mainCategory?.data}
                      placeholder={t("main category placeholder")}
                      name={field.name}
                      onChange={field.onChange}
                      // value={formData?.category?.[locale as string] || ""}
                    />
                  )}
                />
              )}
              {!isChecked && (
                <Controller
                  name={"subCategory"}
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <SmartSearchMultipleInput
                      lang={locale}
                      isFetching={isFetchingSubCategories}
                      existedItems={currentSubCategories}
                      disabled={
                        productResponse.isLoading ||
                        !smartSeachvalue["_id"] ||
                        isFetchingSubCategories
                      }
                      shouldReset={
                        shouldResetMultipleSearchInput ||
                        productResponse.isSuccess ||
                        (formData.category?.en === "" &&
                          smartSeachvalue?.name === "")
                        // smartSeachvalue?.[lang]?.name === "")
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
              {!isChecked && (
                <Box className="col-span-full">
                  <Controller
                    // name={"name.en"}
                    name={"name-en"}
                    control={control}
                    defaultValue={""}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <SmartSearchInput
                        onRemove={() => {
                          if (productSearchName?._id) {
                            onRemoveMainCategory();
                          }
                          onRemoveProductName();
                        }}
                        onChangeName={() => setDoesUserRemovedCategory(false)}
                        lang={lang}
                        errors={errors?.["name-en"]}
                        defaultValue={nameEnValue}
                        isFetching={isFetchingProduct}
                        notAvailableMessage="No Products Available But you can write a new Product Name"
                        disabled={
                          productResponse.isLoading || isFetchingProduct
                        }
                        shouldReset={
                          shouldMainCategoryReset.current ||
                          productResponse.isSuccess
                        }
                        getSmartSearchValue={setProductSearchName}
                        textLabel={`${t("Product Name")} ${
                          isChecked ? "(عربي)" : "(English)"
                        }`}
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
                    name={"name-ar"}
                    control={control}
                    defaultValue={""}
                    rules={{ required: "هذا الحقل مطلوب" }}
                    render={({ field }) => (
                      <SmartSearchInput
                        onRemove={() => {
                          onRemoveMainCategory();
                          onRemoveProductName();
                        }}
                        lang={lang}
                        errors={errors?.["name-ar"]}
                        defaultValue={nameArValue}
                        isFetching={isFetchingProduct}
                        notAvailableMessage="لا توجد منتجات متاحه لكن يمكن كتابة اسم منتج"
                        disabled={
                          productResponse.isLoading || isFetchingProduct
                        }
                        shouldReset={
                          shouldMainCategoryReset.current ||
                          productResponse.isSuccess
                        }
                        getSmartSearchValue={setProductSearchName}
                        textLabel={`اسم المنتج ${
                          isChecked ? "(عربي)" : "(English)"
                        }`}
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
                            border: "1px solid #000",
                          }}
                        ></Box>
                        <Controller
                          name={`colors-quantity.${color.label}`}
                          control={control}
                          rules={{
                            required: "This field is required",
                            min: {
                              value: 1,
                              message: "Quantity should be more than 1",
                            },
                          }}
                          render={({ field }) => (
                            <CustomizedTextField
                              disabled={productResponse.isLoading}
                              textLabelClass={"font-semibold text-xl"}
                              placeholder={"0"}
                              field={field}
                              formerHelperStyles={{
                                style: { fontSize: "1rem" },
                              }}
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
                      options={_sizes}
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
                  // defaultValue={}
                  rules={{
                    required: "This field is required",
                    min: {
                      value: 1,
                      message: "The Price should be more than 1 ",
                    },
                  }}
                  render={({ field }) => (
                    <CustomizedTextField
                      disabled={productResponse.isLoading}
                      textLabelClass={"font-semibold text-xl"}
                      placeholder={"0"}
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
                  // defaultValue={0}
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
                      disabled={productResponse.isLoading}
                      textLabelClass={"font-semibold text-xl"}
                      placeholder={"0"}
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
                    required: "This field is required",
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
                        textlabel={`${t("Product Description")} ${
                          isChecked ? "(عربي)" : "(English)"
                        }`}
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
                            lineHeight: "2.4rem",
                          },
                          "& .MuiInputBase-inputMultiline": {
                            fontSize: "1.4rem",
                            lineHeight: "2.4rem",
                          },
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
                        textlabel={`وصف المنتج ${
                          isChecked ? "(عربي)" : "(English)"
                        }`}
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
                            lineHeight: "2.4rem",
                          },
                          "& .MuiInputBase-inputMultiline": {
                            fontSize: "1.4rem",
                            lineHeight: "2.4rem",
                          },
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
                imagesNumber={6}
                setValue={setValue}
              />
            </Box>
          )}
        </Box>
        {
          // formData.category?.ar &&
          //   formData.category?.ar !== "" &&
          //   formData.name?.ar &&
          //   formData.name?.ar !== "" &&
          //   formData.description?.ar &&
          //   formData.description?.ar !== "" &&
          isChecked && (
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
                    boxShadow: "none",
                  },
                }}
                type="submit"
                variant="contained"
                size="large"
              >
                {productResponse.isLoading ? <MiniSpinner /> : t("Add Product")}
              </Button>
            </Box>
          )
        }
      </Box>
    </form>
  );
}

export default AddProductPage;

/**
 * Product
 *    Category  EN
 *    Sub categories(collections)  EN[jeans, old jeans]
 * Product
 *    Category  AR
 *    Sub categories(collections)  AR[جينز، جينز جديد]
 */
