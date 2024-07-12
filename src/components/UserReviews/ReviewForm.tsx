import { UserReviewForm } from "@/types/types";
import CustomizedTextField from "@/ui/TextField/TextField";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import ReactStars from "react-stars";
import "./ReviewForm.css";
import { Button } from "@mui/material";

const ReviewForm = (props) => {
  const t = useTranslations("User");

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserReviewForm>({ mode: "onChange" });

  const onSubmitHandler = (event, data) => {};
  const onErrorsHandler = (event, errors) => {};

  const formData = watch();

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler, onErrorsHandler)}
      className=" flex flex-col gap-8  py-[1.2rem] mb-10 bg-[#FDFDFD] "
    >
      <div className="relative">
        <Controller
          name={"review"}
          defaultValue={""}
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field }) => (
            <CustomizedTextField
              textLabelClass={"font-semibold text-xl"}
              placeholder={t("Review")}
              textlabel={t("Review")}
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
        <Controller
          name={"stars"}
          defaultValue={""}
          control={control}
          render={({ field }) => (
            <ReactStars
              className="review-form-stars"
              count={5}
              onChange={field.onChange}
              value={+field.value || 1}
              color2={"#ffd700"}
            />
          )}
        />
      </div>
      <div className="flex justify-end">
        <Button
          sx={{
            paddingInline: "1.6rem",
            paddingBlock: "1rem",
            fontSize: "1.3rem",
            borderRadius: "5px",
            backgroundColor: "#ED0534",
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
          {t("Add Review")}
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
