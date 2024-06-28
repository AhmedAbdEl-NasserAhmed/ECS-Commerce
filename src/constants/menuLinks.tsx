import { AdminDashboardLink } from "@/types/types";
import { FaBlogger, FaBox, FaEye } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { HiMiniUser } from "react-icons/hi2";

export const productLinks = (locale: string): AdminDashboardLink[] => {
  return [
    {
      id: 1,
      icon: <FaEye />,
      headLine: "VIEW PRODUCTS",
      href: `${locale}/admin/dashboard/productsOverview`,
      pathName: "productsOverview",
    },
    {
      id: 2,
      icon: <FaBox />,
      headLine: "ADD PRODUCT",
      href: `${locale}/admin/dashboard/product`,
      pathName: "product",
    },
  ];
};

export const blogsLinks = (locale: string): AdminDashboardLink[] => [
  {
    id: 1,
    icon: <FaEye />,
    headLine: "VIEW BLOGS",
    href: "",
  },
  {
    id: 2,
    icon: <FaBlogger />,
    headLine: "ADD BLOG",
    href: `${locale}/admin/dashboard/blog`,
    pathName: "blog",
  },
];

export const otherLinks = (locale: string): AdminDashboardLink[] => [
  {
    id: 1,
    icon: <FaGear />,
    headLine: "SETTINGS",
    href: "",
  },
  {
    id: 2,
    icon: <HiMiniUser />,
    headLine: "ACCOUNT",
    href: "",
  },
];
