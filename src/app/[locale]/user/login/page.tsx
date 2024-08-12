"use client";

import { emailRegex, passwordRegex } from "@/constants/regx";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Button, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useUserloginMutation } from "@/lib/features/api/usersApi";
import { loginUser } from "@/lib/features/usersSlice/usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import toast from "react-hot-toast";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import { concatCartItemsHandler, getUniqueValues } from "@/lib/helpers";
import { getCookie } from "cookies-next";
import { setCookiesThunk } from "@/lib/features/cookieSlice/cookieSlice";
import { StorageService } from "@/services/StorageService";
import { useTranslations } from "next-intl";

function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [loginFn, loginState] = useUserloginMutation();

  const dispatch = useAppDispatch();

  const cart = useAppSelector(
    (state) => state.cookieSlice.cookieItems.cartItems
  );

  const wishList = useAppSelector(
    (state) => state.cookieSlice.cookieItems.wishListItems
  );

  const { locale } = useParams();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const userTranslation = useTranslations("user");
  const tMessage = useTranslations("messages");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  function onSubmit(data) {
    loginFn({ email: data.email, password: data.password })
      .unwrap()
      .then((res) => {
        toast.success(userTranslation("Welcome Back"));
        dispatch(
          loginUser({
            user: res.data,
            isAuthenticated: res.token,
            token: res.token,
          })
        );

        const cookiesItems = getCookie("cartItems") || "[]";

        const parsedCookiesItems = StorageService.parse(cookiesItems);

        const responseCartItems = res.data?.cookieCart?.cartItems;

        const wishListCookieitems = getCookie("wishListItems") || "[]";

        const parsedWishListItems = StorageService.parse(wishListCookieitems);

        const responseWishListItems = res.data?.cookieCart?.wishListItems;

        const concatedCartItems = concatCartItemsHandler(
          parsedCookiesItems,
          responseCartItems
        );

        const concatedWishListItems = concatCartItemsHandler(
          parsedWishListItems,
          responseWishListItems
        );

        const cartItems = res.data?.cookieCart?.cartItems
          ? getUniqueValues(concatedCartItems, ["color", "size", "product"])
          : cart;

        const wishListItems = res.data?.cookieCart?.wishListItems
          ? getUniqueValues(concatedWishListItems, ["color", "size", "product"])
          : wishList;

        dispatch(setCookiesThunk("cartItems", cartItems));

        dispatch(setCookiesThunk("wishListItems", wishListItems));

        StorageService.set("userToken", res.token, false);

        StorageService.set("user", res.data);

        router.push(`/${locale}`);
      })
      .catch((err) => {
        toast.error(tMessage(err?.data?.message));
      });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" mt-12 mb-12 bg-white shadow-[0px_0px_7px_5px_#0000000a] max-w-[80rem] m-auto  "
    >
      <div className="p-8 flex flex-col gap-12 ">
        <h2 className="text-3xl text-black font-bold flex justify-center">
          {userTranslation("Log in")}
        </h2>
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
              disabled={loginState.isLoading}
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
          }}
          render={({ field }) => (
            <CustomizedTextField
              disabled={loginState.isLoading}
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
        <div className="flex justify-between">
          <Link
            className="text-xl text-[#ed0534] font-bold"
            href={`/${locale}/user/register`}
          >
            {userTranslation("Craete a new account ")}
          </Link>
          <Link
            className="text-[#ed0534]  font-semibold sm:text-md md:text-xl "
            href={`/${locale}/user/forgetPassword`}
          >
            {userTranslation("Forget My Password")}
          </Link>
        </div>

        <Button
          disabled={loginState.isLoading}
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
          {loginState.isLoading ? <MiniSpinner /> : userTranslation("Log in")}
        </Button>
      </div>
    </form>
  );
}

export default LoginPage;
