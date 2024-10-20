import { useLazyGetPromocodeByCodeQuery } from "@/lib/features/api/promocodesApi";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface UserPromocode {
  code: string;
}

const PromocodeForm = (props: { setEnteredPromocode: any }) => {
  const { handleSubmit, watch, register } = useForm<UserPromocode>({
    mode: "onChange",
  });

  const [getPromocode, getPromocodeResponse] = useLazyGetPromocodeByCodeQuery();

  const formData = watch();

  const t = useTranslations("user");

  const expirationDate = new Date(
    getPromocodeResponse.data?.data?.expirationDate?.slice(0, 10)
  );

  const PromocodeMessage = () => {
    if (getPromocodeResponse.isSuccess && !getPromocodeResponse.isFetching) {
      if (getPromocodeResponse.data?.data) {
        if (new Date(expirationDate) >= new Date()) {
          return (
            <h1 className="mt-1 text-[#27ae60] font-bold">
              {t("success promocode message", {
                discount: getPromocodeResponse.data?.data.discount,
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
    } else return null;
  };

  const onSubmit = (data) => {
    getPromocode(data.code)
      .unwrap()
      .then((d) => {
        props.setEnteredPromocode(d.data);
      })
      .catch((err) => {
        props.setEnteredPromocode(null);
        toast.error(t(err?.data?.message));
      });
  };
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
          disabled={!formData.code}
          className={`flex items-center justify-center bg-[#ed0533] self-stretch w-20 border border-[#ed0533] rounded-md text-white font-medium text-xl ${
            formData.code ? "hover:bg-white" : ""
          } hover:text-[#ed0533] hover:border transition-all duration-200 ${
            !formData.code
              ? "bg-gray-300 text-white border-none hover:bg-gray-300 hover:text-white"
              : ""
          }`}
        >
          {getPromocodeResponse.isFetching || getPromocodeResponse.isLoading ? (
            <MiniSpinner />
          ) : (
            t("Apply")
          )}
        </button>
      </form>
      <PromocodeMessage />
    </div>
  );
};

export default PromocodeForm;
