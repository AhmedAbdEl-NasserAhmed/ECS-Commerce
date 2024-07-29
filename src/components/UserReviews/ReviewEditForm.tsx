"use client";

import { UserReviewForm } from "@/types/types";
import CustomizedTextField from "@/ui/TextField/TextField";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";

import "./ReviewEditForm.scss";
import { Button } from "@mui/material";
import { useAppSelector } from "@/lib/hooks";
import { UserType } from "@/types/enums";
import {
  useEditReviewMutation,
  useSendReviewMutation,
} from "@/lib/features/api/reviewsApi";
import toast from "react-hot-toast";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import Spinner from "@/ui/Spinner/Spinner";
import ReactStars from "@/ui/ReactStars/ReactStars";

const ReviewEditForm = ({ review }) => {
  const t = useTranslations("User");

  const user = useAppSelector((state) => state.usersSlice.user);

  const isAuthenticated = useAppSelector(
    (state) => state.usersSlice.isAuthenticated
  );

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserReviewForm>({ mode: "onChange" });

  const [editReview, editReviewRes] = useEditReviewMutation();

  const onSubmitHandler = (data) => {
    editReview({
      data: {
        title: data.review,
        ratings: data.stars,
      },
      id: review["_id"],
    })
      .unwrap()
      .then(() => {
        toast.success("your review has been Edited");
        reset();
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  if (editReviewRes.isLoading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className=" flex flex-col gap-8 p-12 w-[80vw] md:w-[50vw] rounded-md  bg-[#FDFDFD] "
    >
      <div className="relative">
        <Controller
          name={"review"}
          defaultValue={review?.title}
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field }) => (
            <CustomizedTextField
              disabled={
                user?.role === UserType.ADMIN ||
                !isAuthenticated ||
                editReviewRes.isLoading
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
        <div className="review-form-stars">
          <Controller
            name={"stars"}
            defaultValue={review?.ratings}
            control={control}
            render={({ field }) => (
              <ReactStars
                readOnly={false}
                disabled={
                  user?.role === UserType.ADMIN ||
                  !isAuthenticated ||
                  editReviewRes.isLoading
                }
                size={"large"}
                value={+field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          disabled={
            user?.role === UserType.ADMIN ||
            !isAuthenticated ||
            editReviewRes.isLoading
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
          {user?.role === UserType.ADMIN ||
          !isAuthenticated ||
          editReviewRes.isLoading ? (
            <MiniSpinner />
          ) : (
            "Edit Review"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ReviewEditForm;
