"use client";

import { useActivateEmailMutation } from "@/lib/features/api/usersApi";
import { loginUser } from "@/lib/features/usersSlice/usersSlice";
import { useAppDispatch } from "@/lib/hooks";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Button } from "@mui/material";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

function VerifyEmailAddressPage({ setShowModal }) {
  const [otp, setOtp] = useState<string>("");

  const dispatch = useAppDispatch();

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    setOtp(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    activeEmailFn({ otp })
      .unwrap()
      .then((res) => {
        toast.success("Your Email is Activated");
        dispatch(
          loginUser({
            user: res.data,
          })
        );
        setShowModal();
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch(() => {
        toast.error("something went wrong");
      });
  }

  const [activeEmailFn, activeEmailResponse] = useActivateEmailMutation();

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[50vw] lg:w-[30vw] p-8 bg-white text-[#161616} h-96 rounded-lg text-center flex flex-col gap-12 "
    >
      <h2 className="text-3xl capitalize font-bold"> ENTER THE OTP</h2>
      <CustomizedTextField
        disabled={activeEmailResponse.isLoading}
        value={otp}
        onChange={handleChangeInput}
        type="text"
        placeholder="ENTER THE OTP"
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
        {activeEmailResponse.isLoading ? <MiniSpinner /> : " Verify Email"}
      </Button>
    </form>
  );
}

export default VerifyEmailAddressPage;
