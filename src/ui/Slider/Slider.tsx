"use client";

import { useEffect, useState } from "react";
import { slides } from "@/constants/slides";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetSubCategoryQuery } from "@/lib/features/api/subCategoriesApi";
import { HomeCategory, Lang } from "@/types/enums";
import { useGetCategoryQuery } from "@/lib/features/api/categoriesApi";
import Spinner from "../Spinner/Spinner";

function Slider() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const { locale } = useParams();

  const { data: mainCategory, isLoading } = useGetCategoryQuery({
    letter: HomeCategory.MAIN_CATEGORY,
    lang: Lang.ENGLISH,
  });

  const { data: subCategories, isLoading: subCategoriesLoading } =
    useGetSubCategoryQuery(
      {
        letter: HomeCategory.MALE_JEANS_EN,
        lang: Lang.ENGLISH,
        categoryId: mainCategory?.data[0]?.["_id"],
      },
      { skip: !mainCategory?.data[0]?.["_id"] }
    );

  const category = mainCategory?.data[0];
  const subCategory = subCategories?.data.find((subCategory) => {
    return (
      subCategory.name[Lang.ENGLISH].toLowerCase() ===
      HomeCategory.MALE_JEANS_EN
    );
  });

  const slideStyle =
    locale === "ar"
      ? `translateX(${currentSlide * 100}vw)`
      : `translateX(-${currentSlide * 100}vw)`;

  const t = useTranslations("user");

  const slider = slides(t);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slider.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (subCategoriesLoading || isLoading) return <Spinner />;

  return (
    <div className="relative h-[calc(70vh-90px)] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: slideStyle }}
      >
        {slider.map((slide) => {
          return (
            <Link
              key={slide.id}
              href={slide.href(locale, category, subCategory)}
            >
              <div
                className={`w-screen h-full flex flex-col gap-16 xl:flex-row`}
                style={{
                  backgroundImage: `url(${slide.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "50% 50%",
                  backgroundRepeat: "no-repeat",
                  aspectRatio: "16 / 9",
                }}
              ></div>
            </Link>
          );
        })}
      </div>
      <ul className="absolute left-1/2 m-auto bottom-8 flex gap-4">
        {slides(t).map((slide, index) => (
          <li
            className={`w-5 h-5 rounded-full ring-1 ring-gray-600 cursor-pointer flex justify-center items-center ${
              currentSlide === index ? "scale-150" : ""
            } `}
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
          >
            {currentSlide === index && (
              <div className="w-[8px] h-[8px] bg-gray-600 rounded-full"></div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Slider;
