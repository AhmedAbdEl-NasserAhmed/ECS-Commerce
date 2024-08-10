"use client";

import { emailRegex, passwordRegex } from "@/constants/regx";
import {
  useUserloginMutation,
  useUserSignupMutation,
} from "@/lib/features/api/usersApi";
import { loginUser } from "@/lib/features/usersSlice/usersSlice";
import { useAppDispatch } from "@/lib/hooks";

import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Button, IconButton, InputAdornment } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

function RegisterPage() {
  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { locale } = useParams();

  const router = useRouter();

  const [signupFn, signupResponse] = useUserSignupMutation();

  const userTranslation = useTranslations("user");
  const tMessage = useTranslations("messages");

  const dispatch = useAppDispatch();

  const formData = watch();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  function onSubmit(data) {
    signupFn({
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    })
      .unwrap()
      .then((res) => {
        dispatch(loginUser({ user: res.data }));
        localStorage.setItem("user", JSON.stringify(res.data));
        toast.success(tMessage("You have created a new email"));
        router.push(`/${locale}/user/login`);
        reset();
      })
      .catch((err) => toast.error(err.data.message));
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" mt-12 mb-12 bg-white shadow-[0px_0px_7px_5px_#0000000a] max-w-[80rem] m-auto  "
    >
      <div className="p-8 flex flex-col gap-12 ">
        <h2 className="text-3xl text-black font-bold flex justify-center">
          {userTranslation("REGISTER")}
        </h2>
        <Controller
          name={"name"}
          control={control}
          defaultValue={""}
          rules={{
            required: "This field is required",
            minLength: {
              value: 4,
              message: userTranslation(
                "The name should be more than 4 characters "
              ),
            },
          }}
          render={({ field }) => (
            <CustomizedTextField
              disabled={signupResponse.isLoading}
              textLabelClass={"font-semibold text-xl"}
              placeholder={userTranslation("First Name")}
              textlabel={userTranslation("First Name")}
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
            required: userTranslation("Please Enter A Valid Email"),
            pattern: {
              value: emailRegex,
              message: userTranslation("Please Enter Valid Email Format"),
            },
          }}
          render={({ field }) => (
            <CustomizedTextField
              disabled={signupResponse.isLoading}
              textLabelClass={"font-semibold text-xl"}
              placeholder={userTranslation("Email Address")}
              textlabel={userTranslation("Email Address")}
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
          name={"password"}
          control={control}
          defaultValue={""}
          rules={{
            required: userTranslation("Please Enter A Valid Password"),
            pattern: {
              value: passwordRegex,
              message: userTranslation(
                "password must be at least 8 characters long and include an uppercase letter, lowercase letter, digit, and special character"
              ),
            },
          }}
          render={({ field }) => (
            <CustomizedTextField
              disabled={signupResponse.isLoading}
              textLabelClass={"font-semibold text-xl"}
              placeholder={userTranslation("Password")}
              textlabel={userTranslation("Password")}
              field={field}
              formerHelperStyles={{ style: { fontSize: "1rem" } }}
              errors={errors}
              type={showPassword ? "text" : "password"}
              variant={"outlined"}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              size={"small"}
            />
          )}
        />
        <Controller
          name={"confirmPassword"}
          control={control}
          defaultValue={""}
          rules={{
            required: userTranslation("This field is required"),
            validate: (value) => {
              if (value !== formData.password)
                return userTranslation("Password does not match");
            },
          }}
          render={({ field }) => (
            <CustomizedTextField
              disabled={signupResponse.isLoading}
              textLabelClass={"font-semibold text-xl"}
              placeholder={userTranslation("Confirm Password")}
              textlabel={userTranslation("Confirm Password")}
              field={field}
              formerHelperStyles={{ style: { fontSize: "1rem" } }}
              errors={errors}
              type={showConfirmPassword ? "text" : "password"}
              variant={"outlined"}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <MdVisibility />
                      ) : (
                        <MdVisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              size={"small"}
            />
          )}
        />

        <Button
          disabled={signupResponse.isLoading}
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
          {signupResponse.isLoading ? (
            <MiniSpinner />
          ) : (
            userTranslation("Register")
          )}
        </Button>
      </div>
    </form>
  );
}

export default RegisterPage;
