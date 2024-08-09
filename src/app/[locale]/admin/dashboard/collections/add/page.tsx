"use client";
import useDebounceHook from "@/hooks/useDebounceHook";
import useThrottle from "@/hooks/useThrottle";
import {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
} from "@/lib/features/api/categoriesApi";
import { useAddSubCategoryMutation } from "@/lib/features/api/subCategoriesApi";
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

function AddSubCategoriesPage() {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<AdminSubCategory>({
    mode: "onChange",
  });

  const t = useTranslations("Dashboard");

  const formData = watch();
  const { locale } = useParams();

  const router = useRouter();

  const [smartSeachvalue, setSmartSeachValue] = useState<{
    id: string;
    name: string;
  }>({ id: "", name: "" });

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [allCategories, setAllCategories] = useState<string[]>([]);

  const [lang, setLang] = useState("en");

  const debounceValue = useDebounceHook(smartSeachvalue.name);

  const { data, isLoading, isFetching } = useGetCategoryQuery({
    letter: debounceValue,
    lang,
  });

  const { data: AllCategories } = useGetAllCategoriesQuery("categories");

  const params = useParams();

  const [addSubCategoryFn, subCategoryResponse] = useAddSubCategoryMutation();

  function showInputsHandler(e) {
    setIsChecked(e.target.checked);
  }

  useEffect(() => {
    setLang(isChecked ? Lang.ARABIC : Lang.ENGLISH);
  }, [isChecked]);

  useEffect(() => {
    setAllCategories(
      AllCategories?.data.map((category) => category.name[lang])
    );
  }, [AllCategories?.data, lang]);

  console.log("formData", formData);

  function handleAddSubCategorySubmit() {
    if (
      !formData.category.en ||
      !formData.category.ar ||
      !formData.name.en ||
      !formData.name.ar ||
      !formData.description.en ||
      !formData.description.ar
    ) {
      toast.error("Please check form inputs");
      return;
    }
    addSubCategoryFn({
      name: formData.name,
      description: formData.description,
      category: smartSeachvalue["_id"],
    })
      .unwrap()
      .then((res) => {
        if (res.status === "success") {
          toast.success("A New Collection Added");
          setSmartSeachValue({
            id: "",
            name: "",
          });
          setIsChecked(false);
          router.replace(`/${locale}/admin/dashboard/collections`);
          reset();
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("This Category is Already Added");
        }
      });
  }

  // return <h1>Hello</h1>;

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
          href={`/${params.locale}/admin/dashboard/categories/add`}
          style={{ color: "#ed0534", textDecoration: "underline" }}
        >
          {t("Add New Category")}
        </Link>
      </Box>
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit(handleAddSubCategorySubmit)}
      className=" flex flex-col gap-8 px-[4rem] py-[1.2rem] bg-[#FDFDFD] "
    >
      <Box className="h-[10vh] flex justify-between items-center">
        <Box className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold  text-gray-600">
            {t("Add Collection")}
          </h2>
          <Box className="flex items-center gap-4 text-[1.4rem]">
            <Link className="text-[#ed0534]" href="/">
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
            {t("Add Collection")}
            {isChecked ? "(عربي)" : ""}
          </h2>
          <FormControlLabel
            control={
              <Switch
                // disabled={
                //   errors.category?.[lang] ||
                //   formData.category?.en === "" ||
                //   formData.name?.en === "" ||
                //   formData.description?.en === ""
                // }
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
              name={"category.en"}
              control={control}
              defaultValue={""}
              rules={{
                required: "This field is required",
                validate(value) {
                  if (!allCategories?.includes(value))
                    return "You Have to choose from available categories";
                },
              }}
              render={({ field }) => (
                <SmartSearchInput
                  lang={lang}
                  isFetching={isFetching}
                  notAvailableMessage="No Categories Available"
                  errors={errors?.["category"]?.["en"]}
                  disabled={subCategoryResponse.isLoading || isFetching}
                  shouldReset={subCategoryResponse.isSuccess}
                  getSmartSearchValue={setSmartSeachValue}
                  textLabel={t("Main Category")}
                  defaultValue={formData.category?.en}
                  data={data?.data}
                  placeholder={t("Search for category")}
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
                    return "You Have to choose from available categories";
                },
              }}
              render={({ field }) => (
                <SmartSearchInput
                  lang={lang}
                  errors={errors?.["category"]?.["ar"]}
                  isFetching={isFetching}
                  notAvailableMessage="No Categories Available"
                  disabled={subCategoryResponse.isLoading || isFetching}
                  shouldReset={subCategoryResponse.isSuccess}
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
          )}
          {!isChecked && (
            <Controller
              name={"name.en"}
              control={control}
              defaultValue={""}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <CustomizedTextField
                  disabled={isLoading}
                  textLabelClass={"font-semibold text-xl"}
                  textlabel={t("Collection Name")}
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
              defaultValue={""}
              rules={{ required: "هذا الحقل مطلوب" }}
              render={({ field }) => (
                <CustomizedTextField
                  disabled={isLoading}
                  textLabelClass={"font-semibold text-xl"}
                  placeholder={"اسم المجموعة"}
                  textlabel={"اسم المجموعة"}
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
              defaultValue={""}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <CustomizedTextField
                  disabled={isLoading}
                  textLabelClass={"font-semibold text-xl"}
                  placeholder={t("Collection Description")}
                  textlabel={t("Collection Description")}
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
              defaultValue={""}
              rules={{ required: "هذا الحقل مطلوب" }}
              render={({ field }) => (
                <CustomizedTextField
                  disabled={isLoading}
                  textLabelClass={"font-semibold text-xl"}
                  placeholder={"وصف المجموعة"}
                  textlabel={"وصف المجموعة"}
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
              disabled={isLoading || subCategoryResponse.isLoading}
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
              {subCategoryResponse.isLoading ? (
                <MiniSpinner />
              ) : (
                t("Add Collection")
              )}
            </Button>
          )}
        </Box>
      </Box>
    </form>
  );
}

export default AddSubCategoriesPage;
