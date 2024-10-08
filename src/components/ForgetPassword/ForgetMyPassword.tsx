"use client";

import { useForgetPasswordMutation } from "@/lib/features/api/usersApi";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

function ForgetMyPassword() {
  const { locale } = useParams();
  const router = useRouter();

  const userTranslation = useTranslations("user");
  const tMessage = useTranslations("messages");

  const [email, setEmail] = useState<string>("");

  const [forgetPasswordFn, forgetPasswordResponse] =
    useForgetPasswordMutation();

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    forgetPasswordFn({ email, locale })
      .unwrap()
      .then(() => {
        toast.success(tMessage("An email has sent to your mailbox"));
        router.push(`/${locale}`);
      })
      .catch((err) => {
        toast.error(tMessage(err.data.message));
      });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[50vw] lg:w-[30vw] p-8 bg-white text-[#161616} h-96 rounded-lg text-center flex flex-col gap-12 "
    >
      <h2 className="text-3xl capitalize font-bold">
        {" "}
        {userTranslation("ENTER YOUR EMAIL")}
      </h2>
      <CustomizedTextField
        disabled={forgetPasswordResponse.isLoading}
        value={email}
        onChange={handleChangeInput}
        type="text"
        placeholder={userTranslation("ENTER YOUR EMAIL")}
      />
      <Button
        disabled={forgetPasswordResponse.isLoading}
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
        {userTranslation("ENTER YOUR EMAIL")}
      </Button>
    </form>
  );
}

export default ForgetMyPassword;
