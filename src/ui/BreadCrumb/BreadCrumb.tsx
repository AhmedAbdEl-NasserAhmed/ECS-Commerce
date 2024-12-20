"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

function BreadCrumb() {
  const { locale } = useParams();

  const route = usePathname();

  const currentRoute = route.split("/")[3];

  const userTranslation = useTranslations("user");

  return (
    <div className="bg-[url(/cloth_bg.png)] bg-cover bg-no-repeat h-[30vh] mb-15 flex items-center justify-center text-3xl text-white text-center">
      <div>
        <h2 className="capitalize font-semibold tracking-wider text-5xl">
          {userTranslation(currentRoute)}
        </h2>
        <div className="flex items-center justify-center gap-8 mt-5">
          <Link href={`/${locale}`}>{userTranslation("Home")}</Link>
          <p>\</p>
          <h2 className="capitalize font-semibold tracking-wider text-[#f1e5cd] ">
            {userTranslation(currentRoute)}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default BreadCrumb;
