import { UserReviewForm } from "@/types/types";
import CustomizedTextField from "@/ui/TextField/TextField";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import ReactStars from "react-stars";
import "./ReviewForm.css";
import { Button } from "@mui/material";
import { useAppSelector } from "@/lib/hooks";
import { UserType } from "@/types/enums";
import { useSendReviewMutation } from "@/lib/features/api/reviewsApi";
import toast from "react-hot-toast";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import Spinner from "@/ui/Spinner/Spinner";

const ReviewForm = (props) => {
  const t = useTranslations("User");

  const user = useAppSelector((state) => state.usersSlice.user);

  const isAuthenticated = useAppSelector(
    (state) => state.usersSlice.isAuthenticated
  );

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UserReviewForm>({ mode: "onChange" });

  const [sendReview, reviewRes] = useSendReviewMutation();

  const onSubmitHandler = (data) => {
    if (data.stars < 1) {
      toast.error("Please Review must be 1 or more");
      return;
    }

    sendReview({
      title: data.review,
      ratings: data.stars,
      user: user["_id"],
      product: props.productId,
    })
      .unwrap()
      .then(() => {
        toast.success("your review has been added");
        reset();
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  if (reviewRes.isLoading) return;

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
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
              disabled={
                user?.role === UserType.ADMIN ||
                !isAuthenticated ||
                reviewRes.isLoading
              }
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
              disabled={
                user?.role === UserType.ADMIN ||
                !isAuthenticated ||
                reviewRes.isLoading
              }
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
          disabled={
            user?.role === UserType.ADMIN ||
            !isAuthenticated ||
            reviewRes.isLoading
          }
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
          {user?.role === UserType.ADMIN || reviewRes.isLoading ? (
            <MiniSpinner />
          ) : (
            "Add Review"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
