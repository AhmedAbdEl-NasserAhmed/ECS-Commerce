"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FaExclamationTriangle } from "react-icons/fa";

function FailurePayment() {
  const { locale } = useParams();

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