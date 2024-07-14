"use client";

import CustomizedTextField from "@/ui/TextField/TextField";
import { Button } from "@mui/material";
import { ChangeEvent, useState } from "react";

function VerifyEmailAddressPage() {
  const [email, setEmail] = useState<string>("");

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  return (
    <form className="w-[80vw] lg:w-[40vw] p-8 bg-white text-[#161616} h-96 rounded-lg text-center flex flex-col gap-12 ">
      <h2 className="text-3xl capitalize font-bold"> ENTER THE OTP</h2>
      <CustomizedTextField
        value={email}
        onChange={handleChangeInput}
        type="text"
        placeholder="ENTER THE OTP"
      />
      <Button
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
        Verify Email
      </Button>
    </form>
  );
}

export default VerifyEmailAddressPage;
