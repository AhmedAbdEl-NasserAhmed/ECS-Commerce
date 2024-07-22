"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import GridContainer from "../Container/GridContainer";

function HomePageCategory() {
  const { locale } = useParams();

  return (
    <>
      <div className=" text-center mb-10">
        <h1 className="text-6xl font-semibold uppercase text-heading-color1 pb-4">
          Best Sale Categories
        </h1>

        <p className="font-normal	text-paragraph-color1 text-[1.6rem]">
          Have a Tour in our amaizng JEANS offers
        </p>
      </div>
      <GridContainer columns={2} gap={1} className="h-[50rem]">
        <div className="bg-[url(https://tailoredathlete.com/cdn/shop/articles/Best_Jeans_for_Body_Type_Male_900x.jpg?v=1677586239)] bg-cover bg-center w-full bg-no-repeat relative group h-[50rem]">
          <div className="bg-black/50 opacity-0 transition-all hover:opacity-100 w-full h-full duration-400 flex flex-col gap-10 items-center justify-center">
            <h3 className="text-white text-4xl uppercase tracking-[1rem] font-medium">
              Male Jeans
            </h3>
            <Link
              className="text-3xl bg-white text-black p-6 rounded-md transition-all duration-400"
              href={`/${locale}/user/productsList/6696d2e5498de05bd22375b9?&subCategory=669da7c5ba39b5d2a32b0352`}
            >
              Start Shopping
            </Link>
          </div>
        </div>
        <div className="bg-[url(https://www.darveys.com/blog/wp-content/uploads/2022/03/featured-image.jpg)] bg-cover bg-center w-full bg-no-repeat h-[50rem] relative group">
          <div className="bg-black/50 opacity-0 transition-all hover:opacity-100 w-full h-full duration-400 flex flex-col gap-10 items-center justify-center">
            <h3 className="text-white text-4xl uppercase tracking-[1rem] font-medium">
              Female Jeans
            </h3>
            <Link
              className="text-3xl bg-white text-black p-6 rounded-md transition-all duration-400"
              href={`/${locale}/user/productsList/6696d2e5498de05bd22375b9?&subCategory=669da7d8ba39b5d2a32b0355`}
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </GridContainer>
    </>
  );
}

export default HomePageCategory;
