"use client";

import contactusIcons from "@/constants/contactusIcons";
import { emailRegex } from "@/constants/regx";
import { useSendFeedBackMutation } from "@/lib/features/api/feedbacks";
import { useAppSelector } from "@/lib/hooks";
import { UserType } from "@/types/enums";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Contact() {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const user = useAppSelector((state) => state.usersSlice.user);

  const [sendFeedBackFn, feedBackResponse] = useSendFeedBackMutation();

  function onSubmit(data) {
    sendFeedBackFn({
      name: data.name,
      email: data.email,
      message: data.message,
    })
      .unwrap()
      .then(() => {
        toast.success("We are always here for you");
        reset();
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  }

  return (
    <div className="flex flex-col md:flex-row justify-center px-10  lg:px-56  mt-12 mb-12 gap-14 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="  bg-white shadow-[0px_0px_7px_5px_#0000000a] w-full"
      >
        <div className="p-8 flex flex-col gap-12 grow ">
          {/* <h2 className="text-3xl text-black font-bold flex justify-center">
            Contact US
          </h2> */}
          <Controller
            name={"name"}
            control={control}
            defaultValue={""}
            rules={{
              required: "This field is required",
              minLength: {
                value: 4,
                message: "The name should be more than 4 characters ",
              },
            }}
            render={({ field }) => (
              <CustomizedTextField
                disabled={
                  user?.role === UserType.ADMIN || feedBackResponse.isLoading
                }
                textLabelClass={"font-semibold text-xl"}
                placeholder={"First Name"}
                textlabel={"First Name"}
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
            name={"email"}
            control={control}
            defaultValue={""}
            rules={{
              required: "Please Enter A Valid Email",
              pattern: {
                value: emailRegex,
                message: "Please Enter Valid Email Format",
              },
            }}
            render={({ field }) => (
              <CustomizedTextField
                disabled={
                  user?.role === UserType.ADMIN || feedBackResponse.isLoading
                }
                textLabelClass={"font-semibold text-xl"}
                placeholder={"Email Address"}
                textlabel={"Email Address"}
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
            name={"message"}
            control={control}
            rules={{ required: "This field is required" }}
            defaultValue=""
            render={({ field }) => (
              <CustomizedTextField
                disabled={
                  user?.role === UserType.ADMIN || feedBackResponse.isLoading
                }
                textLabelClass={"font-semibold text-xl"}
                placeholder={"Message"}
                textlabel={"Message"}
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
          <Button
            disabled={
              user?.role === UserType.ADMIN || feedBackResponse.isLoading
            }
            sx={{
              padding: "0.85rem",
              fontSize: "1.2rem",
              backgroundColor: "#ed0534",
              "&:hover": {
                backgroundColor: "#141414",
              },
            }}
            type="submit"
            variant="contained"
            size="large"
          >
            {feedBackResponse.isLoading ? (
              <MiniSpinner />
            ) : (
              "Send your feedback"
            )}
          </Button>
        </div>
      </form>
      <div className=" p-8 bg-white shadow-[0px_0px_7px_5px_#0000000a] w-full xl:w-3/4">
        <ul className="h-full flex justify-center flex-col gap-14">
          {contactusIcons().map((contactDetail) => {
            return (
              <li key={contactDetail.id} className="flex items-center gap-6">
                <span className="w-20 h-20 p-3 flex items-center justify-center text-3xl rounded-full border-2 border-[#16161678]">
                  {contactDetail.icon}
                </span>
                <div className="flex flex-col text-xl gap-4 tracking-widest">
                  <h2 className="capitalize">{contactDetail.label}</h2>
                  <p>{contactDetail.value}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Contact;
