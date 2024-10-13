"use client";

import { useAddCategoryMutation } from "@/lib/features/api/categoriesApi";
import { AdminPromocode } from "@/types/types";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Box, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiChevronRight } from "react-icons/hi2";

function PromoCodePage() {
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<AdminPromocode>({
    mode: "onChange",
  });

  const [addCategory, categoryState] = useAddCategoryMutation();

  // const router = useRouter();

  const { locale } = useParams();

  const formData = watch();

  const t = useTranslations("Dashboard");
  const tMessage = useTranslations("messages");

  function handleAddCategorySubmit() {
    // if (
    //   !formData.name.en ||
    //   !formData.name.ar ||
    //   !formData.description.en ||
    //   !formData.description.ar
    // ) {
    //   toast.error(tMessage("Please check form inputs"));
    //   return;
    // }
    // addCategory({
    //   name: formData.name,
    //   description: formData.description,
    // })
    //   .unwrap()
    //   .then((res) => {
    //     if (res.status === "success") {
    //       toast.success(tMessage("A New Main Category Added"));
    //       reset();
    //     }
    //   })
    //   .catch((err) => {
    //     if (err) {
    //       toast.error(tMessage("This Category is Already Added"));
    //     }
    //   });
  }

  return (
    <form
      onSubmit={handleSubmit(handleAddCategorySubmit)}
      className=" flex flex-col gap-8 px-[4rem] py-[1.2rem] bg-[#FDFDFD] "
    >
      <Box className="h-[10vh] flex justify-between items-center">
        <Box className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold  text-gray-600">
            {t("Add Promocode")}
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
            <h4>{t("Promocodes")}</h4>
          </Box>
        </Box>
      </Box>
      <Box className="relative grow flex flex-col gap-8 bg-white rounded-2xl border-2 p-10 border-slate-100 shadow-md">
        <Box className="mb-4">
          <Box>
            <Box className="flex justify-between items-center">
              <h2 className="text-3xl font-semibold mb-5">
                {t("Add Promocode")}
              </h2>
            </Box>
          </Box>

          <span className=" absolute top-28 left-0 block h-[1px] w-full bg-gray-200">
            &nbsp;
          </span>
        </Box>
        <Box className="relative flex flex-col  gap-12">
          <Controller
            name={"promocode"}
            control={control}
            defaultValue={""}
            rules={{
              required: "This field is required",
            }}
            render={({ field }) => (
              <CustomizedTextField
                customError={errors?.promocode}
                disabled={categoryState.isLoading}
                textLabelClass={"font-semibold text-xl"}
                placeholder={t("Promocode")}
                textlabel={`${t("Promocode")}`}
                field={field}
                errors={errors}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                type={"text"}
                variant={"outlined"}
                size={"small"}
              />
            )}
          />
          <Controller
            name={"expiredAt"}
            disabled={categoryState.isLoading}
            control={control}
            rules={{
              required: "This field is required",
            }}
            render={({ field }) => (
              <div className="flex flex-col gap-4">
                <label className={"font-semibold text-xl"}>
                  {t("Expired At")}
                </label>
                <input
                  type="date"
                  className="w-full h-[40px] rounded-lg border border-gray-300 text-right pr-4 placeholder-gray-400 text-gray-600"
                  style={{ direction: "rtl" }}
                  min={new Date().toISOString().slice(0, 10)}
                />
              </div>
            )}
          />
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
                value: 100,
                message: "This field should be less than 100 % ",
              },
            }}
            render={({ field }) => (
              <CustomizedTextField
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
        </Box>
        <Box>
          <Button
            disabled={categoryState.isLoading}
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
            {categoryState.isLoading ? <MiniSpinner /> : t("Add Promocode")}
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default PromoCodePage;
