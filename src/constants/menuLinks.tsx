import { AdminDashboardLink } from "@/types/types";
import { FaBlogger, FaBox, FaEye } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { HiMiniUser } from "react-icons/hi2";

export const productLinks: AdminDashboardLink[] = [
  {
    id: 1,
    icon: <FaEye />,
    headLine: "VIEW PRODUCTS",
    href: "/admin/dashboard/productsOverview",
  },
  {
    id: 2,
    icon: <FaBox />,
    headLine: "ADD PRODUCT",
    href: "/admin/dashboard/product",
  },
];

export const blogsLinks: AdminDashboardLink[] = [
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
    href: "/admin/dashboard/blog",
  },
];

export const otherLinks: AdminDashboardLink[] = [
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
