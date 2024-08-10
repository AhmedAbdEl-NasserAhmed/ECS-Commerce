"use client";

import { useActivateEmailMutation } from "@/lib/features/api/usersApi";
import { loginUser } from "@/lib/features/usersSlice/usersSlice";
import { useAppDispatch } from "@/lib/hooks";
import { StorageService } from "@/services/StorageService";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

function VerifyEmailAddressPage({ setShowModal }) {
  const [otp, setOtp] = useState<string>("");

  const router = useRouter();

  const t = useTranslations("user");
  const tMessage = useTranslations("messages");

  const { locale } = useParams();

  const dispatch = useAppDispatch();

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    setOtp(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    activeEmailFn({ otp })
      .unwrap()
      .then((res) => {
        toast.success(tMessage("Your Account is Activated"));
        dispatch(
          loginUser({
            user: res.data,
            isAuthenticated: res.token,
            token: res.token,
          })
        );

        setShowModal();
        localStorage.setItem("user", JSON.stringify(res.data));

        StorageService.set("userToken", res.token, false);

        router.push(`/${locale}`);
      })
      .catch(() => {
        toast.error(tMessage("something went wrong"));
      });
  }

  const [activeEmailFn, activeEmailResponse] = useActivateEmailMutation();

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[50vw] lg:w-[30vw] p-8 bg-white text-[#161616} h-96 rounded-lg text-center flex flex-col gap-12 "
    >
      <h2 className="text-3xl capitalize font-bold">{t("Enter the OTP")}</h2>
      <CustomizedTextField
        disabled={activeEmailResponse.isLoading}
        value={otp}
        onChange={handleChangeInput}
        type="text"
        placeholder={t("Enter the OTP")}
      />
      <Button
        disabled={activeEmailResponse.isLoading}
        sx={{
          padding: "0.85rem",
          fontSize: "1.2rem",
          backgroundColor: "#ed0534",
          "&:hover": {
            backgroundColor: "#161616",
          },
        }}
        type="submit"
        variant="contained"
        size="large"
      >
        {activeEmailResponse.isLoading ? <MiniSpinner /> : t("Verify Email")}
      </Button>
    </form>
  );
}

export default VerifyEmailAddressPage;
