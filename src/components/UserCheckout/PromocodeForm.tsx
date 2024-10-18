import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

const today = new Date();

const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

interface UserPromocode {
  code: string;
}

const PromocodeForm = (props) => {
  const [appliedPromocode, setAppliedPromocode] = useState({
    code: "qwe",
    discount: "20",
    expiredAt: tomorrow,
  });

  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm<UserPromocode>({
    mode: "onChange",
  });

  const formData = watch();

  const t = useTranslations("user");

  const PromocodeMessage = () => {
    if (appliedPromocode) {
      if (appliedPromocode.expiredAt >= today) {
        return (
          <h1 className="mt-1 text-[#27ae60] font-bold">
            {t("success promocode message", {
              discount: appliedPromocode.discount,
            })}{" "}
            🔥
          </h1>
        );
      } else {
        return (
          <h1 className="mt-1 text-[#c0392b] font-bold">
            {t("fail promocode message")} 😭
          </h1>
        );
      }
    }
    return null;
  };

  const onSubmit = () => {};
  const onError = () => {};

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex items-stretch gap-4"
      >
        <input
          className="border border-gray-300 rounded-md p-1.5 w-60 px-4 text-xl"
          placeholder={t("Enter promo code")}
          {...register("code", {})}
        />
        <button
          type="submit"
          className="bg-[#ed0533] self-stretch w-20 border border-[#ed0533] rounded-md text-white font-medium text-xl hover:bg-white hover:text-[#ed0533] hover:border transition-all duration-200"
        >
          {t("Apply")}
        </button>
      </form>
      <PromocodeMessage />
    </div>
  );
};

export default PromocodeForm;
