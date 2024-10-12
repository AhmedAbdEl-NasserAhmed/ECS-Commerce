"use client";

import Image from "next/image";
import Link from "next/link";
import BaseContainer from "../Container/BaseContainer";
import { useEffect, useState } from "react";
import { handleOpenPdf } from "@/lib/helpers";
import { useParams } from "next/navigation";
import { useGetAllCategoriesQuery } from "@/lib/features/api/categoriesApi";
import { useTranslations } from "next-intl";

function Footer() {
  const [isClient, setIsClient] = useState(false);
  const { locale } = useParams();
  const { data } = useGetAllCategoriesQuery("categories");
  const userTranslation = useTranslations("user");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return;

  return (
    <div className="py-28 bg-gray-100 text-xl">
      <BaseContainer>
        {/* TOP */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* LEFT */}
          <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
            <Link href="/" className="text-[1.6rem] font-normal">
              <div className="text-2xl tracking-wide font-semibold">ORCA</div>
            </Link>
            <p className="text-[1.6rem] font-normal">Egypt Cairo</p>
            <span className="text-[1.6rem] font-semibold">
              wear.orca.eg@gmail.com
            </span>
            <span className="text-[1.6rem] font-semibold">
              +20 101 965 8353
            </span>
            <div className="flex gap-6">
              <Link
                href="https://www.facebook.com/profile.php?id=61567088061864"
                target="_blank"
              >
                <Image src="/facebook.png" alt="" width={16} height={16} />{" "}
              </Link>
              <Link
                href="https://www.instagram.com/orca.wear.eg"
                target="_blank"
              >
                <Image src="/instagram.png" alt="" width={16} height={16} />{" "}
              </Link>
            </div>
          </div>
          {/* CENTER */}
          <div className="hidden lg:flex justify-between w-1/2">
            <div className="">
              <h1 className="mb-16 text-heading-color1 font-medium uppercase text-3xl">
                {userTranslation("COMPANY")}
              </h1>
              <div className="flex flex-col gap-6">
                <Link
                  href={`/${locale}/user/about`}
                  className="text-[1.6rem] font-normal"
                >
                  {userTranslation("About")}
                </Link>
                <Link
                  href={`/${locale}/user/contact`}
                  className="text-[1.6rem] font-normal"
                >
                  {userTranslation("Contact Us")}
                </Link>
              </div>
            </div>
            <div className="">
              <h1 className="mb-16 text-heading-color1 font-medium uppercase text-3xl">
                {userTranslation("SHOP")}
              </h1>
              <div className="flex flex-col gap-6">
                {data?.data?.length > 0 &&
                  data?.data?.map((category) => {
                    return (
                      <Link
                        key={category?._id}
                        href={`/${locale}/user/productsList/${category?._id}`}
                        className="text-[1.6rem] font-normal"
                      >
                        {category?.name?.[locale as string]}
                      </Link>
                    );
                  })}
              </div>
            </div>
            <div className="">
              <h1 className="mb-16 text-heading-color1 font-medium uppercase text-3xl">
                {userTranslation("HELP")}
              </h1>
              <div className="flex flex-col gap-6">
                <Link
                  href=""
                  className="text-[1.6rem] font-normal"
                  onClick={handleOpenPdf.bind(null, `/privacy-policy.pdf`)}
                >
                  {userTranslation("Privacy Policy")}
                </Link>
                <Link
                  href=""
                  className="text-[1.6rem] font-normal"
                  onClick={handleOpenPdf.bind(null, `/return-policy.pdf`)}
                >
                  {userTranslation("Return and refund policy")}
                </Link>
              </div>
            </div>
          </div>
          {/* RIGHT */}
          {/* <div className="w-full md:w-1/2 lg:w-1/4">
            <h1 className="mb-16 text-heading-color1 font-medium uppercase text-3xl">
              SUBSCRIBE
            </h1>
            <p>
              Be the first to get the latest news about trends, promotions, and
              much more!
            </p>
            <div className="flex">
              <input
                type="text"
                placeholder="Email address"
                className="p-4 w-3/4"
              />
              <button className="w-1/4 bg-lama text-white">JOIN</button>
            </div>
            <span className="font-semibold">Secure Payments</span>
            <div className="flex justify-between">
              <Image src="/payMob.png" alt="" width={80} height={40} />
            </div>
          </div> */}
        </div>
        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
          <div className="">© 2024 ORCA Shop</div>
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="">
              <span className="text-gray-500 mr-4">Language</span>
              <span className="font-semibold">Arabic | English</span>
            </div>
            <div className="">
              <span className="text-gray-500 mr-4">Currency</span>
              <span className="font-semibold">EGP</span>
            </div>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
}

export default Footer;
