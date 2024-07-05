import { Dispatch, SetStateAction, useState } from "react";
import { Box } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineViewGrid } from "react-icons/hi";
import { HiCube } from "react-icons/hi2";
import { useParams } from "next/navigation";
import { useHandleWindowWidth } from "@/hooks/useHandleWindowWidth";
import SubMenuLink from "./SubMenuLink";
import { HiFolder } from "react-icons/hi";

interface Props {
  expand: boolean;
  setExpand?: (value: unknown) => void;
  expanded: string | boolean;
  setExpanded: Dispatch<SetStateAction<string | false>>;
}

function Links({ setExpand, expand, expanded, setExpanded }: Props) {
  const isWidthHiger = useHandleWindowWidth();

  const { locale } = useParams();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      onMouseEnter={isWidthHiger ? () => setExpand(false) : null}
      className={` ${
        expand ? "min-[100px]:w-0 sm:w-0 md:w-0 lg:w-[5vw]" : "lg:w-[16vw]"
      }  flex border-2 transition-all duration-500 fixed w-[30rem] top-[calc(100vh-90vh)] h-screen z-[40] lg:sticky lg:top-0 group border-gray-100 bg-[#FFFFFF] flex-col overflow-hidden shadow-lg lg:shadow-none  `}
    >
      <Box className="bg-[#FFFFFF] border-b-2 border-gray-100 p-6 h-[9.8vh] flex justify-center items-center">
        <Link
          href="/"
          className="p-2 text-md sm:text-xl md:text-3xl flex gap-5 min-w-[16vw] justify-center items-center font-bold   "
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
        <Link
          href="/"
          className="flex items-center border-b-2 gap-4 border-gray-100 p-8 text-xl font-semibold"
        >
          <span className="text-4xl">
            <HiOutlineViewGrid />
          </span>
          <p
            className={` 
              ${expand ? "opacity-0" : "opacity-1"}
              ${expand ? "translate-x-[40rem]" : "translate-x-0"}
                group-hover:block group-hover:opacity-100 group-hover:translate-x-0 text-gray-700 transition-opacity transition-opacity-500 transition-transform-500 ease-in-out`}
          >
            DASHBOARD
          </p>
        </Link>

        <SubMenuLink
          expanded={expanded}
          handleChange={handleChange}
          menuName="Products"
          id="products"
          expand={expand}
          setExpand={setExpand}
          icon={<HiCube />}
          menuLinks={[
            {
              href: `/${locale}/admin/dashboard/products`,
              linkName: "All Products",
            },
            {
              href: `/${locale}/admin/dashboard/products/add`,
              linkName: "Add Product",
            },
          ]}
        />
        <SubMenuLink
          expanded={expanded}
          handleChange={handleChange}
          menuName="Categories"
          id="categories"
          expand={expand}
          setExpand={setExpand}
          icon={<HiFolder />}
          menuLinks={[
            {
              href: `/${locale}/admin/dashboard/categories`,
              linkName: "All Categories",
            },
            {
              href: `/${locale}/admin/dashboard/categories/add`,
              linkName: "Add Category",
            },
          ]}
        />
        <SubMenuLink
          expanded={expanded}
          handleChange={handleChange}
          menuName="Sub Categories"
          id="sub-categories"
          expand={expand}
          setExpand={setExpand}
          icon={<HiFolder />}
          menuLinks={[
            {
              href: `/${locale}/admin/dashboard/sub-categories`,
              linkName: "All Sub Categories",
            },
            {
              href: `/${locale}/admin/dashboard/sub-categories/add`,
              linkName: "Add Sub Category",
            },
          ]}
        />
      </Box>
    </Box>
  );
}

export default Links;
