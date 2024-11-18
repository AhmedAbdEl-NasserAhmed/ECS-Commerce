import BaseContainer from "@/ui/Container/BaseContainer";
import { useTranslations } from "next-intl";

function About() {
  const user = useTranslations("user");

  return (
    <BaseContainer className="my-16 py-28">
      <p className="text-4xl text-center my-10 leading-relaxed">
        {user("about orca description")}
      </p>
    </BaseContainer>
  );
}

export default About;
