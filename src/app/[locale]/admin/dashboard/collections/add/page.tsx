"use client";
import useDebounceHook from "@/hooks/useDebounceHook";
import useThrottle from "@/hooks/useThrottle";
import {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
} from "@/lib/features/api/categoriesApi";
import { useAddSubCategoryMutation } from "@/lib/features/api/subCategoriesApi";
import { AdminSubCategory } from "@/types/types";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import SmartSearchInput from "@/ui/SmartSearchInput/SmartSearchInput";
import Spinner from "@/ui/Spinner/Spinner";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Box, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiChevronRight } from "react-icons/hi2";

function AddSubCategoriesPage() {
  const {
    handleSubmit,
    control,
    setError,
    reset,
    watch,
    formState: { errors },
  } = useForm<AdminSubCategory>({ mode: "onChange" });

  const formData = watch();

  const [smartSeachvalue, setSmartSeachValue] = useState<{
    id: string;
    name: string;
  }>({ id: "", name: "" });

  const debounceValue = useDebounceHook(smartSeachvalue.name);

  const { data, isLoading, isFetching } = useGetCategoryQuery(debounceValue);

  const { data: AllCategories } = useGetAllCategoriesQuery("categories");

  const t = useTranslations("Dashboard");

  const params = useParams();

  const [addSubCategoryFn, subCategoryResponse] = useAddSubCategoryMutation();

  useEffect(() => {
    const allCategories = data?.data.map((category) => category.name);
    if (
      allCategories &&
      smartSeachvalue.name !== "" &&
      !allCategories?.includes(formData?.category)
    ) {
      setError("category", {
        type: "required",
        message: "You Have to choose from available categories",
      });
    }
  }, [data?.data, formData?.category, setError, smartSeachvalue.name]);

  function handleAddSubCategorySubmit() {
    addSubCategoryFn({
      name: formData.name.trim(),
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
          reset();
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("This Category is Already Added");
        }
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
          href={`/${params.locale}/admin/dashboard/categories/add`}
          style={{ color: "#5b93ff", textDecoration: "underline" }}
        >
          {t("Add New Category")}
        </Link>
      </Box>
    );
  }

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
            <Link className="text-blue-400" href="/">
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
        <Box className="mb-4">
          <h2 className="text-3xl font-semibold mb-5">{t("Add Collection")}</h2>
          <span className=" absolute left-0 block h-[1px] w-full bg-gray-200">
            &nbsp;
          </span>
        </Box>
        <Box className="relative flex flex-col gap-12">
          <Controller
            name={"category"}
            control={control}
            defaultValue={""}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <SmartSearchInput
                isFetching={isFetching}
                notAvailableMessage="No Categories Available"
                errors={errors}
                disabled={subCategoryResponse.isLoading || isFetching}
                shouldReset={subCategoryResponse.isSuccess}
                getSmartSearchValue={setSmartSeachValue}
                textLabel={t("Main Category")}
                data={data?.data}
                placeholder={t("Search for category")}
                name={field.name}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name={"name"}
            control={control}
            defaultValue={""}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <CustomizedTextField
                sx={{
                  backgroundColor:
                    isLoading || formData.category === "" ? "#f5f5f5" : "",
                }}
                disabled={isLoading || !!errors.category}
                textLabelClass={"font-semibold text-xl"}
                placeholder={t("Collection Name")}
                textlabel={t("Collection Name")}
                field={field}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                errors={errors}
                type={"text"}
                variant={"outlined"}
                size={"small"}
              />
            )}
          />
          <Controller
            name={"description"}
            control={control}
            defaultValue={""}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <CustomizedTextField
                disabled={isLoading || !!errors.category}
                textLabelClass={"font-semibold text-xl"}
                placeholder={t("Collection Description")}
                textlabel={t("Collection Description")}
                field={field}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                errors={errors}
                type={"text"}
                variant={"outlined"}
                multiline={true}
                rows={6}
                sx={{
                  backgroundColor:
                    isLoading || formData.category === "" ? "#f5f5f5" : "",
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
        <Box>
          <Button
            disabled={
              isLoading ||
              formData.category === "" ||
              subCategoryResponse.isLoading ||
              !!errors.category
            }
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
            {subCategoryResponse.isLoading ? (
              <MiniSpinner />
            ) : (
              t("Add Collection")
            )}
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default AddSubCategoriesPage;
