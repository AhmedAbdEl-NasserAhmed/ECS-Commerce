"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import CustomizedTextField from "@/ui/TextField/TextField";
import { HiArrowRightEndOnRectangle } from "react-icons/hi2";
import { useForm, Controller } from "react-hook-form";
import { LoginFormData } from "@/types/types";
import { emailRegex } from "@/constants/regx";
import Image from "next/image";

function AdminLoginForm() {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  function onSubmit(data: LoginFormData) {
    const isAuthenticated = false;

    if (!isAuthenticated && data.loginEmail && data.loginPassword) {
      router.push("/admin/dashboard/product");
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex w-[85vw] md:w-[70vw] flex-col lg:flex-row rounded-xl shadow-lg h-[95vh] lg:h-[65vh] overflow-hidden "
    >
      <Box
        component="div"
        className="relative p-9 flex flex-col justify-between lg:w-1/2 w-full h-full bg-[url('/sign-in-img.png')] bg-no-repeat bg-cover bg-center   "
      >
        <Image
          src="/logo-login.png"
          alt="logo image"
          width={250}
          height={250}
          objectFit="contain"
        />
        <p className="text-white text-[1.67rem] font-medium text-center w-4/5 ml-auto mr-auto mb-[5rem]">
          Nulla laborum sit voluptate anim in. Nulla ut qui ex ipsum id aliqua
          amet exercitation. Anim ididunt anim anim voluptate enim.
        </p>
      </Box>
      <Box
        component="div"
        display="flex"
        flexDirection="column"
        gap={4}
        className=" px-12 py-10  grow bg-white rounded-xl lg:rounded-none"
      >
        <Box component="div" className="flex flex-col gap-4">
          <Typography
            variant="h2"
            component="h2"
            className=" text-[2rem] font-medium tracking-wide"
          >
            Welcome Back!
          </Typography>

          <Typography
            variant="h5"
            component="h5"
            className=" text-[1.4rem] tracking-wider "
          >
            Sign in to continue to{" "}
            <Link className="text-blue-400" href="/">
              AndShop
            </Link>
          </Typography>
        </Box>
        <Box component="div" display="flex" flexDirection="column" gap={3}>
          <Controller
            name="loginEmail"
            control={control}
            defaultValue=""
            rules={{
              required: "Please Enter A Valid Email",
              pattern: {
                value: emailRegex,
                message: "Please Enter Valid Email Format",
              },
            }}
            render={({ field }) => (
              <CustomizedTextField
                textlabel="User Name"
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                field={field}
                error={!!errors.loginEmail}
                helperText={errors.loginEmail ? errors.loginEmail.message : ""}
                type="text"
                placeholder="Enter username"
                variant="outlined"
                size="small"
                sx={{
                  helperText: {
                    fontSize: "4rem",
                  },
                  input: {
                    fontSize: "1.4rem",
                  },

                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderWidth: "2px",
                      borderRadius: "40px",
                      borderColor: "#dcdbdb",
                      backgroundColor: "#f1f1f152",
                    },

                    "& .MuiInputBase-input": {
                      paddingBlock: "1rem",
                      paddingInline: "1.8rem",
                      fontSize: "1.5rem",
                      color: "#878787",

                      "&::placeholder": {
                        color: "#939393",
                        fontSize: "1.5rem",
                        opacity: 1,
                      },
                    },

                    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(186, 9, 9)", // Customize the border color on error here
                    },

                    "&:hover fieldset": {
                      borderColor: "#dcdbdb",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "#dcdbdb",
                    },
                  },
                }}
              />
            )}
          />
          <Controller
            name="loginPassword"
            control={control}
            defaultValue=""
            rules={{ required: "Please Enter A valid Password" }}
            render={({ field }) => (
              <CustomizedTextField
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                error={!!errors.loginPassword}
                helperText={
                  errors.loginPassword ? errors.loginPassword.message : ""
                }
                field={field}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                variant="outlined"
                size="small"
                sx={{
                  helperText: {
                    fontSize: "4rem",
                  },
                  input: {
                    fontSize: "1.4rem",
                  },

                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgb(6 182 212)",
                      borderRadius: "5px",
                      borderWidth: "2px",
                    },
                    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(186, 9, 9)", // Customize the border color on error here
                    },

                    "&:hover fieldset": {
                      borderColor: "rgb(6 182 212)",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "rgb(6 182 212)",
                    },
                  },
                  width: "100%",
                }}
                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Box>
        <Button
          sx={{
            backgroundColor: "#3dbadd",
            "&:hover": {
              backgroundColor: "#28abcf",
            },
          }}
          type="submit"
          variant="contained"
          size="medium"
          endIcon={<HiArrowRightEndOnRectangle />}
        >
          Log In
        </Button>
        <Box component="div" className="text-center">
          <Link
            className="text-cyan-500 font-semibold sm:text-md md:text-xl "
            href=""
          >
            Forgotten password ?
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminLoginForm;
