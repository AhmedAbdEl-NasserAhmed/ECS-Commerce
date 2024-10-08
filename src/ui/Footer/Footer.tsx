"use client";

import Image from "next/image";
import Link from "next/link";
import BaseContainer from "../Container/BaseContainer";
import { useEffect, useState } from "react";
import { handleOpenPdf } from "@/lib/helpers";
import { useParams } from "next/navigation";
import { useGetAllCategoriesQuery } from "@/lib/features/api/categoriesApi";

function Footer() {
  const [isClient, setIsClient] = useState(false);
  const { locale } = useParams();
  const { data, isLoading } = useGetAllCategoriesQuery("categories");

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
            <span className="text-[1.6rem] font-semibold">hello@Orca.com</span>
            <span className="text-[1.6rem] font-semibold">+1 234 567 890</span>
            <div className="flex gap-6">
              <Image src="/facebook.png" alt="" width={16} height={16} />
              <Image src="/instagram.png" alt="" width={16} height={16} />
              <Image src="/youtube.png" alt="" width={16} height={16} />
              <Image src="/pinterest.png" alt="" width={16} height={16} />
              <Image src="/x.png" alt="" width={16} height={16} />
            </div>
          </div>
          {/* CENTER */}
          <div className="hidden lg:flex justify-between w-1/2">
            <div className="">
              <h1 className="mb-16 text-heading-color1 font-medium uppercase text-3xl">
                COMPANY
              </h1>
              <div className="flex flex-col gap-6">
                <Link
                  href={`/${locale}/user/about`}
                  className="text-[1.6rem] font-normal"
                >
                  About Us
                </Link>
                <Link
                  href={`/${locale}/user/contact`}
                  className="text-[1.6rem] font-normal"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="">
              <h1 className="mb-16 text-heading-color1 font-medium uppercase text-3xl">
                SHOP
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
                HELP
              </h1>
              <div className="flex flex-col gap-6">
                <Link
                  href=""
                  className="text-[1.6rem] font-normal"
                  onClick={handleOpenPdf.bind(null, `/privacy-policy.pdf`)}
                >
                  Privacy Policy
                </Link>
                <Link
                  href=""
                  className="text-[1.6rem] font-normal"
                  onClick={handleOpenPdf.bind(null, `/return-policy.pdf`)}
                >
                  Return and refund policy
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
