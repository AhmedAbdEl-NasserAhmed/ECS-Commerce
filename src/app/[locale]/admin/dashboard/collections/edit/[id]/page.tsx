"use client";
import useDebounceHook from "@/hooks/useDebounceHook";
import useThrottle from "@/hooks/useThrottle";
import {
  useGetCategoryByIdQuery,
  useGetCategoryQuery,
} from "@/lib/features/api/categoriesApi";
import {
  useAddSubCategoryMutation,
  useEditSubCategoryMutation,
  useGetSubCategoryByIdQuery,
} from "@/lib/features/api/subCategoriesApi";
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

function EditSubCategoryPage() {
  const params = useParams();

  const { data: subCategoryData, isFetching: isSubCategoryFetching } =
    useGetSubCategoryByIdQuery(params.id);

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<AdminSubCategory>({
    mode: "onChange",
  });

  const formData = watch();

  const t = useTranslations("Dashboard");

  const [smartSeachvalue, setSmartSeachValue] = useState<{
    id: string;
    name: string;
  }>({ id: "", name: "" });

  const [isMainCategoryIncluded, setIsMainCategoryIncluded] =
    useState<boolean>(false);

  const [allCategories, setAllCategories] = useState<string[]>([]);

  const debounceValue = useDebounceHook(smartSeachvalue.name);

  const { data, isLoading } = useGetCategoryQuery(debounceValue, {
    skip: !debounceValue,
  });

  const [editSubCategory, editSubCategoryResponse] =
    useEditSubCategoryMutation();

  useEffect(() => {
    setAllCategories(data?.data.map((category) => category.name));
  }, [data?.data]);

  useEffect(() => {
    if (data?.data.length) {
      const isIncluded = !allCategories?.includes(smartSeachvalue.name);

      setIsMainCategoryIncluded(isIncluded);
    }
  }, [data?.data, smartSeachvalue.name, allCategories]);

  function handleEditSubCategorySubmit() {
    editSubCategory({
      id: params.id,
      data: {
        name: formData.name.trim(),
        description: formData.description,
        category: smartSeachvalue["_id"],
      },
    })
      .unwrap()
      .then((res) => {
        if (res.status === "success") {
          toast.success("A new sub-category updated");
          setSmartSeachValue({
            id: "",
            name: "",
          });
          reset();
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("This sub-category is already there");
        }
      });
  }

  if (isLoading || isSubCategoryFetching) return <Spinner />;

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
          <h2 className="text-3xl font-semibold mb-5">
            {t("Edit Collection")}
          </h2>
          <span className=" absolute left-0 block h-[1px] w-full bg-gray-200">
            &nbsp;
          </span>
        </Box>
        <Box className="relative flex flex-col gap-12">
          <Controller
            name={"category"}
            control={control}
            defaultValue={""}
            rules={{
              required: "This field is required",
              validate(value) {
                if (isMainCategoryIncluded && !allCategories?.includes(value))
                  return "You Have to choose from available categories";
              },
            }}
            render={({ field }) => (
              <SmartSearchInput
                isFetching={isSubCategoryFetching}
                notAvailableMessage="No Categories Available"
                errors={errors}
                disabled={editSubCategoryResponse.isLoading}
                shouldReset={editSubCategoryResponse.isSuccess}
                getSmartSearchValue={setSmartSeachValue}
                textLabel={t("Main Category")}
                data={data?.data}
                placeholder={t("Search for category")}
                name={field.name}
                onChange={field.onChange}
                value={subCategoryData?.data?.category}
              />
            )}
          />
          <Controller
            name={"name"}
            control={control}
            defaultValue={subCategoryData?.data.name}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <CustomizedTextField
                sx={{
                  backgroundColor:
                    isLoading || formData.category === "" ? "#f5f5f5" : "",
                }}
                disabled={isLoading || formData.category === ""}
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
            defaultValue={subCategoryData?.data.description}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <CustomizedTextField
                disabled={isLoading || formData.category === ""}
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
              isSubCategoryFetching ||
              editSubCategoryResponse.isLoading
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
            {isSubCategoryFetching || editSubCategoryResponse.isLoading ? (
              <MiniSpinner />
            ) : (
              t("Edit Collection")
            )}
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default EditSubCategoryPage;
