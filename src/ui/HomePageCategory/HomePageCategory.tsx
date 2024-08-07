"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import GridContainer from "../Container/GridContainer";
import { useGetCategoryQuery } from "@/lib/features/api/categoriesApi";
import Spinner from "../Spinner/Spinner";
import { useGetSubCategoryQuery } from "@/lib/features/api/subCategoriesApi";
import { HomeCategory, Lang } from "@/types/enums";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

function HomePageCategory() {
  const { locale } = useParams();

  const { data: mainCategory, isLoading } = useGetCategoryQuery({
    letter: HomeCategory.MAIN_CATEGORY,
    lang: Lang.ENGLISH
  });

  const [maleJeans, setMaleJeans] = useState({ _id: "" });

  const [femaleJeans, setFemaleJeans] = useState({ _id: "" });

  const t = useTranslations("user");

  const { data: subCategories, isLoading: subCategoriesLoading } =
    useGetSubCategoryQuery(
      {
        letter: HomeCategory.MALE_JEANS_EN,
        lang: Lang.ENGLISH,
        categoryId: mainCategory?.data[0]?.["_id"]
      },
      { skip: !mainCategory?.data[0]?.["_id"] }
    );

  useEffect(() => {
    setMaleJeans(
      subCategories?.data.find((subCategory) => {
        return (
          subCategory.name[Lang.ENGLISH].toLowerCase() ===
          HomeCategory.MALE_JEANS_EN
        );
      })
    );
    setFemaleJeans(
      subCategories?.data.find((subCategory) => {
        return (
          subCategory.name[Lang.ENGLISH].toLowerCase() ===
          HomeCategory.FEMALE_JEANS_EN
        );
      })
    );
  }, [subCategories?.data]);

  if (isLoading || subCategoriesLoading) return <Spinner />;

  if (!maleJeans?._id && !femaleJeans?._id) return;

  return (
    <>
      <div className=" text-center mb-10">
        <h1 className="text-6xl font-semibold uppercase text-heading-color1 pb-4">
          {t("Best Sale Categories")}
        </h1>

        <p className="font-normal	text-paragraph-color1 text-[1.6rem]">
          {t("Have a Tour in our amazing offers")}
        </p>
      </div>
      <GridContainer columns={2} gap={1} className="h-[50rem]">
        {maleJeans?._id && (
          <div className="bg-[url(https://tailoredathlete.com/cdn/shop/articles/Best_Jeans_for_Body_Type_Male_900x.jpg?v=1677586239)] bg-cover bg-center w-full bg-no-repeat relative group h-[50rem]">
            <div className="bg-black/50 opacity-0 transition-all hover:opacity-100 w-full h-full duration-400 flex flex-col gap-10 items-center justify-center">
              <h3
                className={`text-white text-4xl uppercase ${
                  locale === "en" ? "tracking-[1rem]" : ""
                } font-medium`}
              >
                {t("male Jeans")}
              </h3>

              <Link
                className="text-3xl bg-white text-black p-6 rounded-md transition-all duration-400"
                href={`/${locale}/user/productsList/${mainCategory?.data[0]["_id"]}?&subCategory=${maleJeans?.["_id"]}`}
              >
                {t("Start Shopping")}
              </Link>
            </div>
          </div>
        )}
        {femaleJeans?._id && (
          <div className="bg-[url(https://www.darveys.com/blog/wp-content/uploads/2022/03/featured-image.jpg)] bg-cover bg-center w-full bg-no-repeat h-[50rem] relative group">
            <div className="bg-black/50 opacity-0 transition-all hover:opacity-100 w-full h-full duration-400 flex flex-col gap-10 items-center justify-center">
              <h3
                className={`text-white text-4xl uppercase ${
                  locale === "en" ? "tracking-[1rem]" : ""
                } font-medium`}
              >
                {t("Female Jeans")}
              </h3>
              <Link
                className="text-3xl bg-white text-black p-6 rounded-md transition-all duration-400"
                href={`/${locale}/user/productsList/${mainCategory?.data[0]["_id"]}?&subCategory=${femaleJeans?.["_id"]}`}
              >
                {t("Start Shopping")}
              </Link>
            </div>
          </div>
        )}
      </GridContainer>
    </>
  );
}

export default HomePageCategory;
