import { AdminDashboardLink } from "@/types/types";
import { FaBlogger, FaBox, FaEye } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { HiMiniUser } from "react-icons/hi2";

import { HiCube } from "react-icons/hi2";
import { HiFolder } from "react-icons/hi";
import { PiFoldersFill } from "react-icons/pi";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdReviews } from "react-icons/md";

export const productLinks = (locale: string): AdminDashboardLink[] => {
  return [
    {
      id: 1,
      icon: <FaEye />,
      headLine: "VIEW PRODUCTS",
      href: `${locale}/admin/dashboard/products`,
      pathName: "products",
    },
    {
      id: 2,
      icon: <FaBox />,
      headLine: "ADD PRODUCT",
      href: `${locale}/admin/dashboard/products/add`,
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

export const AdminSubmenuLinks = (locale, { tDashboard }) => [
  {
    menuName: tDashboard("Products"),
    id: "products",
    icon: <HiCube />,
    children: [
      {
        href: `/${locale}/admin/dashboard/products`,
        linkName: tDashboard("All Products"),
      },
      {
        href: `/${locale}/admin/dashboard/products/add`,
        linkName: tDashboard("Add Product"),
      },
    ],
  },
  {
    menuName: tDashboard("Categories"),
    id: "categories",
    icon: <HiFolder />,
    children: [
      {
        href: `/${locale}/admin/dashboard/categories`,
        linkName: tDashboard("All Categories"),
      },
      {
        href: `/${locale}/admin/dashboard/categories/add`,
        linkName: tDashboard("Add Category"),
      },
    ],
  },
  {
    menuName: tDashboard("Sub Categories"),
    id: "sub-categories",
    icon: <PiFoldersFill />,
    children: [
      {
        href: `/${locale}/admin/dashboard/sub-categories`,
        linkName: tDashboard("All Sub Categories"),
      },
      {
        href: `/${locale}/admin/dashboard/sub-categories/add`,
        linkName: tDashboard("Add Sub Category"),
      },
    ],
  },
  {
    menuName: tDashboard("Orders"),
    id: "orders",
    icon: <BsFillCartCheckFill />,
    children: [
      {
        href: `/${locale}/admin/dashboard/orders`,
        linkName: tDashboard("All Orders"),
      },
    ],
  },
  {
    menuName: tDashboard("Reviews"),
    id: "reviews",
    icon: <MdReviews />,
    children: [
      {
        href: `/${locale}/admin/dashboard/reviews`,
        linkName: tDashboard("All Reviews"),
      },
    ],
  },
];
