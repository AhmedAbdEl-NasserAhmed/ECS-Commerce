"use client";

import { emailRegex, passwordRegex } from "@/constants/regx";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Button, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Link from "next/link";
import { useParams } from "next/navigation";

function LoginPage() {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const formData = watch();

  const { locale } = useParams();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  function onSubmit() {}

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" mt-44 bg-white shadow-[0px_0px_7px_5px_#0000000a] max-w-[80rem] m-auto  "
    >
      <div className="p-8 flex flex-col gap-12 ">
        <h2 className="text-3xl text-black font-bold flex justify-center">
          LOG IN
        </h2>
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
          name={"password"}
          control={control}
          defaultValue={""}
          rules={{
            required: "Please Enter A Valid Password",
          }}
          render={({ field }) => (
            <CustomizedTextField
              textLabelClass={"font-semibold text-xl"}
              placeholder={"Password "}
              textlabel={"Password "}
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
        <div className="flex justify-between">
          <Link className="text-xl font-bold" href={`/${locale}/user/register`}>
            Craete a new account ?
          </Link>
          <Link
            className="text-[#141414] font-semibold sm:text-md md:text-xl "
            href=""
          >
            Forget My Password ?
          </Link>
        </div>
        <Button
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
          Log In
        </Button>
      </div>
    </form>
  );
}

export default LoginPage;
