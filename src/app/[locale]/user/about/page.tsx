import BaseContainer from "@/ui/Container/BaseContainer";
import { useTranslations } from "next-intl";

function About() {
  const user = useTranslations("user");

  return (
    <BaseContainer className="my-16">
      <hr />
      <p className="text-5xl my-10 leading-relaxed">
        {user("about orca description")}
      </p>
      <hr />
    </BaseContainer>
  );
}

export default About;
