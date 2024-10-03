import BaseContainer from "@/ui/Container/BaseContainer";
import { useTranslations } from "next-intl";

function About() {
  const user = useTranslations("user");

  return (
    <BaseContainer className="my-16">
      <h1 className="text-6xl font-semibold text-center uppercase text-heading-color1 pb-4">
        {user("About Orca")}
      </h1>
      <hr />
      <p className="text-xl my-10 leading-8">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet optio,
        culpa magnam vitae quam facilis molestias aliquid fugit rem. Quae
        perferendis deleniti accusamus tenetur dolores, temporibus commodi nihil
        deserunt ipsam! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Voluptatum accusantium iure error debitis aperiam eos molestiae deleniti
        laborum magnam qui, doloremque laudantium nisi. Eligendi, fugiat soluta
        error eum quos facere? Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Amet optio, culpa magnam vitae quam facilis molestias
        aliquid fugit rem. Quae perferendis deleniti accusamus tenetur dolores,
        temporibus commodi nihil deserunt ipsam! Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Voluptatum accusantium iure error debitis
        aperiam eos molestiae deleniti laborum magnam qui, doloremque laudantium
        nisi. Eligendi, fugiat soluta error eum quos facere? Lorem ipsum dolor
        sit amet, consectetur adipisicing elit. Amet optio, culpa magnam vitae
        quam facilis molestias aliquid fugit rem. Quae perferendis deleniti
        accusamus tenetur dolores, temporibus commodi nihil deserunt ipsam!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
        accusantium iure error debitis aperiam eos molestiae deleniti laborum
        magnam qui, doloremque laudantium nisi. Eligendi, fugiat soluta error
        eum quos facere?
      </p>
      <hr />
      <ul className="list-disc ml-5 text-xl my-10">
        <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
        <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
        <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
        <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
      </ul>
      <p className="text-xl my-10 leading-8">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet optio,
        culpa magnam vitae quam facilis molestias aliquid fugit rem. Quae
        perferendis deleniti accusamus tenetur dolores, temporibus commodi nihil
        deserunt ipsam! Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Amet optio, culpa magnam vitae quam facilis molestias aliquid
        fugit rem. Quae perferendis deleniti accusamus tenetur dolores,
        temporibus commodi nihil deserunt ipsam!
      </p>
      <hr />
      <p className="text-xl my-10 leading-8">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet optio,
        culpa magnam vitae quam facilis molestias aliquid fugit rem. Quae
        perferendis deleniti accusamus tenetur dolores, temporibus commodi nihil
        deserunt ipsam! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Voluptatum accusantium iure error debitis aperiam eos molestiae deleniti
        laborum magnam qui, doloremque laudantium nisi. Eligendi, fugiat soluta
        error eum quos facere? Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Amet optio, culpa magnam vitae quam facilis molestias
        aliquid fugit rem. Quae perferendis deleniti accusamus tenetur dolores,
        temporibus commodi nihil deserunt ipsam! Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Voluptatum accusantium iure error debitis
        aperiam eos molestiae deleniti laborum magnam qui, doloremque laudantium
        nisi. Eligendi, fugiat soluta error eum quos facere? Lorem ipsum dolor
        sit amet, consectetur adipisicing elit. Amet optio, culpa magnam vitae
        quam facilis molestias aliquid fugit rem. Quae perferendis deleniti
        accusamus tenetur dolores, temporibus commodi nihil deserunt ipsam!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
        accusantium iure error debitis aperiam eos molestiae deleniti laborum
        magnam qui, doloremque laudantium nisi. Eligendi, fugiat soluta error
        eum quos facere?
      </p>
    </BaseContainer>
  );
}

export default About;
