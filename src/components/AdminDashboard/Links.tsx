"use client";

import { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineViewGrid } from "react-icons/hi";
import { useParams, usePathname } from "next/navigation";
import { useHandleWindowWidth } from "@/hooks/useHandleWindowWidth";
import SubMenuLink from "./SubMenuLink";
import { useTranslations } from "next-intl";
import { AdminSubmenuLinks } from "@/constants/menuLinks";

interface Props {
  expand: boolean;
  setExpand?: (value: unknown) => void;
  expanded: string | boolean;
  setExpanded: Dispatch<SetStateAction<string | false>>;
}

function Links({ setExpand, expand, expanded, setExpanded }: Props) {
  const isWidthHiger = useHandleWindowWidth();
  const tDashboard = useTranslations("Dashboard");

  const { locale } = useParams();

  const pathname = usePathname();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const isDashboardActiveLink =
    "/" + pathname.split("/").at(-1) === "/dashboard";

  return (
    <Box
      onMouseEnter={isWidthHiger ? () => setExpand(false) : null}
      className={` ${
        expand ? "min-[100px]:w-0 sm:w-0 md:w-0 lg:w-[5vw]" : "lg:w-[16vw]"
      }  flex border-2 transition-all duration-500 fixed w-[30rem] top-[calc(100vh-90vh)] h-screen z-[40] lg:sticky lg:top-0 group border-gray-100 bg-white flex-col overflow-hidden shadow-lg lg:shadow-none  `}
    >
      <Box className="bg-white border-b-2 border-gray-100 p-6 h-[9.8vh] flex justify-center items-center">
        <Link
          href="/"
          className="p-2 text-md sm:text-xl md:text-3xl flex gap-5 min-w-[16vw] justify-center items-center font-bold"
        >
          <Image src="/favicon.png" alt="logo " width={50} height={50} />
          {!expand && (
            <p
              className={` 
              ${expand ? "opacity-0" : "opacity-1"}
              ${expand ? "translate-x-[40rem]" : "translate-x-0"}
                group-hover:block group-hover:opacity-100 group-hover:translate-x-0 text-gray-700 transition-opacity transition-opacity-500 transition-transform-500 ease-in-out`}
            >
              ORCA
            </p>
          )}
        </Link>
      </Box>
      <Box>
        <div
          className="flex items-center border-b-2 gap-4 border-gray-100 p-8 text-xl font-semibold "
          style={{
            color: isDashboardActiveLink ? "#ed0534" : "",
          }}
        >
          <span className="text-4xl">
            <HiOutlineViewGrid />
          </span>
          <Link
            href={`/${locale}/admin/dashboard`}
            className={` 
              ${expand ? "opacity-0" : "opacity-1"}
              ${expand ? "translate-x-[40rem]" : "translate-x-0"}
                group-hover:block group-hover:opacity-100 group-hover:translate-x-0 text-gray-700 transition-opacity transition-opacity-500 transition-transform-500 ease-in-out`}
            style={{
              color: "inherit",
            }}
          >
            {tDashboard("Dashboard")}
          </Link>
        </div>

        {AdminSubmenuLinks(locale, {
          tDashboard,
        }).map((submenu) => {
          return (
            <SubMenuLink
              key={submenu.id}
              expanded={expanded}
              handleChange={handleChange}
              menuName={submenu.menuName}
              id={submenu.id}
              expand={expand}
              setExpand={setExpand}
              icon={submenu.icon}
              menuLinks={submenu.children}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default Links;
