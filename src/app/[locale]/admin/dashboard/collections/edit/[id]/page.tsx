"use client";
import useDebounceHook from "@/hooks/useDebounceHook";
import { setCategory } from "@/lib/features/adminProductSlice/adminProductSlice";
import {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
} from "@/lib/features/api/categoriesApi";
import {
  useEditSubCategoryMutation,
  useGetSubCategoryByIdQuery,
} from "@/lib/features/api/subCategoriesApi";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Lang } from "@/types/enums";
import { AdminSubCategory } from "@/types/types";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import SmartSearchInput from "@/ui/SmartSearchInput/SmartSearchInput";
import Spinner from "@/ui/Spinner/Spinner";
import CustomizedTextField from "@/ui/TextField/TextField";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiChevronRight } from "react-icons/hi2";

function EditSubCategoryPage() {
  const params = useParams();

  const { data: subCategoryData, isFetching: isSubCategoryFetching } =
    useGetSubCategoryByIdQuery(params.id);

  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<AdminSubCategory>({
    mode: "onChange",
  });

  const formData = watch();

  const router = useRouter();

  const { locale } = useParams();

  const t = useTranslations("Dashboard");

  const tMessage = useTranslations("messages");

  const [smartSeachvalue, setSmartSeachValue] = useState<{
    id: string;
    name: string;
  }>({ id: "", name: "" });

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [isMainCategoryIncluded, setIsMainCategoryIncluded] =
    useState<boolean>(false);

  const [lang, setLang] = useState("en");

  const dispatch = useAppDispatch();

  const adminCollection = useAppSelector((store) => store.adminProductSlice);

  useEffect(() => {
    if (formData?.category && typeof formData?.category === "object") {
      dispatch(setCategory({ data: { ...formData?.category } }));
    }
  }, [formData?.category]);

  useEffect(() => {
    const v = adminCollection.category || formData?.category;
    setValue("category", v);
  }, [isChecked]);

  const onRemoveMainCategory = () => {
    dispatch(setCategory({ data: null }));
    setValue("category", undefined);
  };

  const [allCategories, setAllCategories] = useState<string[]>([]);

  const debounceValue = useDebounceHook(smartSeachvalue.name);

  const { data, isLoading } = useGetCategoryQuery(
    { letter: debounceValue, lang: locale },
    {
      skip: !debounceValue,
    }
  );
  const { data: categories } = useGetAllCategoriesQuery("categories");

  const [editSubCategory, editSubCategoryResponse] =
    useEditSubCategoryMutation();

  function showInputsHandler(e) {
    setIsChecked(e.target.checked);
  }

  useEffect(() => {
    setLang(isChecked ? Lang.ARABIC : Lang.ENGLISH);
  }, [isChecked]);

  useEffect(() => {
    setAllCategories(
      categories?.data?.map((category) => category.name[locale as string])
    );
  }, [categories?.data, lang]);

  useEffect(() => {
    if (data?.data.length) {
      const isIncluded = !allCategories?.includes(smartSeachvalue.name);

      setIsMainCategoryIncluded(isIncluded);
    }
  }, [data?.data, smartSeachvalue.name, allCategories]);

  function handleEditSubCategorySubmit() {
    if (
      !formData.category.en ||
      !formData.name.en ||
      !formData.name.ar ||
      !formData.description.en ||
      !formData.description.ar
    ) {
      toast.error(tMessage("Please check form inputs"));
      return;
    }
    editSubCategory({
      id: params.id,
      data: {
        name: formData.name,
        description: formData.description,
        category: smartSeachvalue["_id"],
      },
    })
      .unwrap()
      .then((res) => {
        if (res.status === "success") {
          toast.success(tMessage("A new collection updated"));
          setSmartSeachValue({
            id: "",
            name: "",
          });
          router.replace(`/${locale}/admin/dashboard/collections`);
          reset();
        }
      })
      .catch((err) => {
        if (err) {
          toast.error(tMessage("This collection is already there"));
        }
      });
  }

  const areAllCategoriesEmpty = !allCategories;

  if (areAllCategoriesEmpty || isSubCategoryFetching || !subCategoryData)
    return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit(handleEditSubCategorySubmit)}
      className=" flex flex-col gap-8 px-[4rem] py-[1.2rem] bg-[#FDFDFD] "
    >
      <Box className="h-[10vh] flex justify-between items-center">
        <Box className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold  text-gray-600">
            {t("Edit Collection")}
          </h2>
          <Box className="flex items-center gap-4 text-[1.4rem]">
            <Link
              className="text-[#ed0534]"
              href={`/${locale}/admin/dashboard`}
            >
              {t("Home")}
            </Link>
            <span>
              <HiChevronRight />
            </span>
            <h4>{t("Collections")}</h4>
          </Box>
        </Box>
      </Box>
      <Box className="relative grow flex flex-col gap-8 bg-white rounded-2xl border-2 p-10 border-slate-100 shadow-md">
        <Box className="mb-4 flex items-center justify-between">
          <h2 className="text-3xl font-semibold mb-5">
            {t("Edit Collection")}
          </h2>
          <FormControlLabel
            control={
              <Switch
                disabled={
                  errors.category?.[lang] ||
                  formData.category?.en === "" ||
                  formData.name?.en === "" ||
                  formData.description?.en === ""
                }
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
        <Box className="relative flex flex-col gap-12">
          {!isChecked && (
            <Controller
              name={"category"}
              control={control}
              defaultValue={subCategoryData?.data?.category?.name}
              rules={{
                required: "This field is required",
                validate(value) {
                  if (
                    // isMainCategoryIncluded &&
                    !allCategories?.includes(value[locale as string])
                  )
                    return "You Have to choose from available categories";
                },
              }}
              render={({ field }) => (
                <SmartSearchInput
                  onRemove={onRemoveMainCategory}
                  lang={locale}
                  isFetching={isSubCategoryFetching}
                  notAvailableMessage={tMessage("No Categories Available")}
                  errors={errors?.["category"]}
                  disabled={
                    editSubCategoryResponse.isLoading || isSubCategoryFetching
                  }
                  shouldReset={editSubCategoryResponse.isSuccess}
                  getSmartSearchValue={setSmartSeachValue}
                  textLabel={t("Main Category")}
                  defaultValue={formData.category?.[locale as string]}
                  data={data?.data}
                  placeholder={t("Search for category")}
                  name={field.name}
                  onChange={field.onChange}
                  // value={subCategoryData?.data?.category}
                />
              )}
            />
          )}
          {/* {isChecked && (
            <Controller
              name={"category.ar"}
              control={control}
              defaultValue={subCategoryData?.data.category.name.ar}
              rules={{
                required: "هذا الحقل مطلوب",
                validate(value) {
                  if (isMainCategoryIncluded && !allCategories?.includes(value))
                    return "You Have to choose from available categories";
                },
              }}
              render={({ field }) => (
                <SmartSearchInput
                  lang={lang}
                  errors={errors?.["category"]?.["ar"]}
                  isFetching={isSubCategoryFetching}
                  notAvailableMessage={(tMessage("No Categories Available"))}
                  disabled={
                    editSubCategoryResponse.isLoading || isSubCategoryFetching
                  }
                  shouldReset={editSubCategoryResponse.isSuccess}
                  getSmartSearchValue={setSmartSeachValue}
                  textLabel={"القسم الرئيسي"}
                  placeholder={"بحث عن القسم"}
                  defaultValue={formData.category.ar}
                  data={data?.data}
                  name={field.name}
                  onChange={field.onChange}
                />
              )}
            />
          )} */}
          {!isChecked && (
            <Controller
              name={"name.en"}
              control={control}
              defaultValue={subCategoryData?.data?.name?.en || ""}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <CustomizedTextField
                  disabled={isLoading}
                  textLabelClass={"font-semibold text-xl"}
                  textlabel={`${t("Collection Name")}${
                    isChecked ? "(عربي)" : "(English)"
                  }`}
                  placeholder={t("Collection Name")}
                  field={field}
                  formerHelperStyles={{ style: { fontSize: "1rem" } }}
                  customError={errors?.["name"]?.["en"]}
                  type={"text"}
                  variant={"outlined"}
                  size={"small"}
                />
              )}
            />
          )}
          {isChecked && (
            <Controller
              name={"name.ar"}
              control={control}
              defaultValue={subCategoryData?.data.name.ar || ""}
              rules={{ required: "هذا الحقل مطلوب" }}
              render={({ field }) => (
                <CustomizedTextField
                  disabled={isLoading}
                  textLabelClass={"font-semibold text-xl"}
                  placeholder={"اسم المجموعة"}
                  textlabel={`اسم المجموعة${
                    isChecked ? "(عربي)" : "(English)"
                  }`}
                  field={field}
                  formerHelperStyles={{ style: { fontSize: "1rem" } }}
                  customError={errors?.["name"]?.["ar"]}
                  type={"text"}
                  variant={"outlined"}
                  size={"small"}
                />
              )}
            />
          )}
          {!isChecked && (
            <Controller
              name={"description.en"}
              control={control}
              defaultValue={subCategoryData?.data?.description?.en || ""}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <CustomizedTextField
                  disabled={isLoading}
                  textLabelClass={"font-semibold text-xl"}
                  placeholder={t("Collection Description")}
                  textlabel={`${t("Collection Description")}${
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
                    },
                    "& .MuiInputBase-inputMultiline": {
                      fontSize: "1.4rem",
                    },
                  }}
                />
              )}
            />
          )}
          {isChecked && (
            <Controller
              name={"description.ar"}
              control={control}
              defaultValue={subCategoryData?.data.description?.ar || ""}
              rules={{ required: "هذا الحقل مطلوب" }}
              render={({ field }) => (
                <CustomizedTextField
                  disabled={isLoading}
                  textLabelClass={"font-semibold text-xl"}
                  placeholder={"وصف المجموعة"}
                  textlabel={`وصف المجموعة${
                    isChecked ? "(عربي)" : "(English)"
                  }`}
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
                    },
                    "& .MuiInputBase-inputMultiline": {
                      fontSize: "1.4rem",
                    },
                  }}
                />
              )}
            />
          )}
        </Box>
        <Box>
          {isChecked && (
            <Button
              disabled={isLoading || editSubCategoryResponse.isLoading}
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
              {editSubCategoryResponse.isLoading ? (
                <MiniSpinner />
              ) : (
                t("Edit Collection")
              )}
            </Button>
          )}
        </Box>
      </Box>
    </form>
  );
}

export default EditSubCategoryPage;
