"use client";

import { AdminDashboardLink } from "@/types/types";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinksListProps {
  header: string;
  links: AdminDashboardLink[];
  onClick?: () => void;
}

function LinksList({ header, links, onClick }: LinksListProps) {
  const params = usePathname();

  const pathName = params.slice(17);

  return (
    <Box
      component="ul"
      className="flex flex-col items-center md:items-start gap-6 lg:gap-5 md:px-8 md:py-6 lg:px-12 lg:py-8  mt-8 md:mt-0"
    >
      <h2 className="md:text-gray-400 text-[1rem] text-white font-extrabold md:text-[1.3rem] md:bg-transparent mb-2 bg-gray-600 px-4 py-2 ">
        {header}
      </h2>
      {links.map((link) => (
        <Box
          key={link.id}
          component="li"
          className=" text-gray-400 bg-transparent font-semibold text-[1.2rem] md:text-xl"
        >
          <Link
            className={` ${
              pathName === link.pathName
                ? "bg-gradient-to-r from-mainColor to-cyan-500 text-white"
                : ""
            }  flex items-center gap-4 hover:bg-gradient-to-r from-mainColor to-cyan-500 px-4 py-3 md:px-2 md:py-2 lg:px-5 lg:py-4 hover:text-white rounded-md  transition-all `}
            href={link.href}
            onClick={onClick}
          >
            <span>{link.icon}</span>
            <span className="tracking-wider">{link.headLine}</span>
          </Link>
        </Box>
      ))}
    </Box>
  );
}

export default LinksList;
