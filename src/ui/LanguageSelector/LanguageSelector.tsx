"use client";

import { languages } from "@/constants/languages";
import useClickOutside from "@/hooks/useClickOutside";
import { useTranslations } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FlagIcon } from "react-flag-kit";
import { HiChevronDown, HiGlobeAlt } from "react-icons/hi2";

function LanguageSelector() {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const { locale } = useParams();

  const ref = useClickOutside({ close: setShowMenu, value: false });

  const router = useRouter();

  const pathName = usePathname();

  function handleChangeLanguage(value) {
    const newPath = pathName.replace(`/${locale}`, `/${value}`);
    router.push(newPath);
  }

  const t = useTranslations("user");

  return (
    <div
      ref={ref}
      onClick={() => setShowMenu((show) => !show)}
      className="relative cursor-pointer text-black text-xl "
    >
      <span className="w-[3rem] h-[3rem] ">
        {locale === "ar" ? (
          <FlagIcon code="EG" size={24} />
        ) : (
          <FlagIcon code="GB" size={24} />
        )}
      </span>

      {showMenu && (
        <ul className="absolute top-12 end-6 bg-white p-2  z-50 shadow-xl flex flex-col gap-4 ">
          {languages(t).map((language) => {
            return (
              <li
                key={language.value}
                onClick={() => {
                  handleChangeLanguage(language.value);
                }}
                className={`${
                  language.value !== locale ? "opacity-100" : "opacity-60"
                } p-2 font-semibold hover:bg-gray-200 flex items-center justify-center gap-8 `}
              >
                <span className="w-[3rem] h-[2rem] rounded-full inline-block">
                  {language.icon}
                </span>
                <span>{language.language}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default LanguageSelector;
