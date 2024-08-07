import { useTranslations } from "next-intl";
import Image from "next/image";

function PaymentDetails() {
  const userTranslation = useTranslations("user");

  return (
    <div className="p-6 bg-white shadow-md  rounded-md flex flex-col gap-8">
      <div>
        <h2 className="text-4xl font-semibold mb-5">
          {userTranslation("Payment Details")}
        </h2>
        <span className="w-full h-1 block bg-[#ed0534] ">&nbsp;</span>
      </div>
      <div className="flex flex-col relative gap-8">
        <h2 className="text-2xl font-semibold">
          {userTranslation("You can pay your order via PAY MOB")}
        </h2>
        <Image
          src="/Paymob.png"
          alt="paymob"
          width={120}
          height={120}
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default PaymentDetails;
