import { handleOpenPdf } from "@/lib/helpers";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

interface IProps {
  setIsUserAcceptedAllPolicies: any;
}

const TermsAndConditions = (props: IProps) => {
  const userTranslation = useTranslations("user");
  const [privacyPolicyAcceptValue, setPrivacyPolicyAcceptValue] =
    useState(false);
  const [returnPolicyAcceptValue, setReturnPolicyAcceptValue] = useState(false);

  useEffect(() => {
    props.setIsUserAcceptedAllPolicies(
      privacyPolicyAcceptValue && returnPolicyAcceptValue
    );
  }, [privacyPolicyAcceptValue, returnPolicyAcceptValue]);

  return (
    <div className="p-6 bg-white shadow-md  rounded-md flex flex-col gap-8">
      <div>
        <h2 className="text-4xl font-semibold mb-5">
          {userTranslation("Please make sure you accept our policies")}
        </h2>
        <span className="w-full h-1 block bg-[#ed0534] ">&nbsp;</span>
      </div>
      <div className="flex relative gap-2">
        <input
          id="privacy"
          name="privacy"
          type="checkbox"
          onChange={(e) => setPrivacyPolicyAcceptValue(e.target.checked)}
        />
        <label htmlFor="privacy" className="text-2xl font-semibold">
          {userTranslation("Privacy Policy")}
        </label>
        <button onClick={handleOpenPdf.bind(null, `/privacy-policy.pdf`)}>
          <FaExternalLinkAlt
            className="ml-2"
            fontSize={"1.2rem"}
            color={"#ed0534"}
          />
        </button>
      </div>
      <div className="flex relative gap-2">
        <input
          id="return"
          name="return"
          type="checkbox"
          onChange={(e) => setReturnPolicyAcceptValue(e.target.checked)}
        />
        <label htmlFor="return" className="text-2xl font-semibold">
          {userTranslation("Return and refund policy")}
        </label>
        <button onClick={handleOpenPdf.bind(null, `/return-policy.pdf`)}>
          <FaExternalLinkAlt
            className="ml-2"
            fontSize={"1.2rem"}
            color={"#ed0534"}
          />
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
