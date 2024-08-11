"use client";

import { clearCookiesThunk } from "@/lib/features/cookieSlice/cookieSlice";
import { useAppDispatch } from "@/lib/hooks";
import { StorageService } from "@/services/StorageService";
import { useTranslations } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";

function SuccessPayment() {
  const { locale } = useParams();

  const router = useRouter();

  const [redirectNumber, setRedirectNumber] = useState<number>(5);

  const [replacedUrl, setReplacedUrl] = useState<boolean>(false);

  const pathName = usePathname();

  const { replace } = useRouter();

  const userTranslation = useTranslations("user");

  const dispatch = useAppDispatch();

  function replaceCurrentUrl(url) {
    replace(url);
    setReplacedUrl(true);
  }

  useEffect(() => {
    const language = StorageService.get("userLang");
    const updatedUrl = pathName.replace("/en", "/" + language);
    replaceCurrentUrl(updatedUrl);
  }, [pathName]);

  useEffect(() => {
    if (replacedUrl) {
      dispatch(clearCookiesThunk("cartItems"));
      StorageService.delete("userLang");

      for (let i = 0; i < redirectNumber; i++) {
        setTimeout(() => {
          setRedirectNumber(i);
        }, 1000);
      }

      if (redirectNumber === 0) {
        toast.success(userTranslation("Your Order is Completed Successfully"));
        router.replace(`/${locale}`);
      }
    }
  }, [redirectNumber, locale, router, dispatch, userTranslation, replacedUrl]);

  return (
    <div className=" flex flex-col items-center justify-center gap-6 mt-12 mb-12 p-8 h-56 bg-white shadow-[0px_0px_7px_5px_#0000000a] max-w-[80rem] m-auto ">
      <div className="flex items-center gap-4">
        <div className="text-[3rem]  md:text-[6rem] text-green-500">
          <FaCheckCircle />
        </div>
        <h2 className="text-2xl md:text-3xl text-green-500">
          {userTranslation("YOU TRANSACTION IS SUCCESFUL")}
        </h2>
      </div>
      <h2 className=" text-xl md:text-2xl font-semibold">
        {userTranslation("You Will be redirected to home Page in")}{" "}
        {redirectNumber}
      </h2>
    </div>
  );
}

export default SuccessPayment;
