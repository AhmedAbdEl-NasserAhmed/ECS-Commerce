"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

function FailurePayment() {
  const { locale } = useParams();

  const router = useRouter();

  const [redirectNumber, setRedirectNumber] = useState<number>(5);

  useEffect(() => {
    for (let i = 0; i < redirectNumber; i++) {
      setTimeout(() => {
        setRedirectNumber(i);
      }, 1000);
    }
    if (redirectNumber === 0) {
      router.replace(`/${locale}`);
    }
  }, [redirectNumber, locale, router]);

  return (
    <div className=" flex flex-col items-center justify-center gap-6 mt-12 mb-12 p-8 h-56 bg-white shadow-[0px_0px_7px_5px_#0000000a] max-w-[80rem] m-auto ">
      <div className="flex items-center gap-4">
        <div className="text-[3rem]  md:text-[6rem] text-red-500">
          <FaExclamationTriangle />
        </div>
        <h2 className="text-2xl md:text-3xl text-red-500">
          YOU TRANSACTION IS FAILED
        </h2>
      </div>
      <Link className=" text-xl md:text-2xl font-semibold" href={`/${locale}`}>
        Go Back to Home Page
      </Link>
    </div>
  );
}

export default FailurePayment;
