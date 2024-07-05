import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiChevronRight } from "react-icons/hi2";

function SubMenuLink({
  expand,
  setExpand,
  id,
  menuName,
  menuLinks,
  icon,
  expanded,
  handleChange,
}) {
  const pathname = usePathname();

  const isActiveLink = pathname.includes("/" + id);

  const SubmenuIcon = function () {
    const _icon = React.cloneElement(icon, {
      style: {
        color: isActiveLink ? "#5b93ff" : "",
      },
    });

    return _icon;
  };

  return (
    <Accordion
      expanded={expanded === id}
      onChange={handleChange(id)}
      sx={{ border: "none", boxShadow: "none" }}
    >
      <AccordionSummary
        className="flex items-center justify-between text-xl font-semibold"
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Box className="flex items-center justify-between text-xl font-semibold w-full">
          <div className="flex items-center gap-4">
            <span className="text-4xl ">
              <SubmenuIcon />
            </span>
            {!expand && (
              <p
                className={`
          group-hover:block group-hover:opacity-100 group-hover:translate-x-0 text-gray-700 transition-opacity transition-opacity-500 transition-transform-500 ease-in-out`}
              >
                {menuName}
              </p>
            )}
          </div>

          {!expand && (
            <span className="text-xl transition-all duration-500">
              <HiChevronRight />
            </span>
          )}
        </Box>

        <span
          style={{ opacity: isActiveLink ? "1" : "0" }}
          className="w-2 h-3/4 transition-opacity duration-500 rounded-2xl absolute bg-[#5b93ff] left-0 top-4"
        ></span>
      </AccordionSummary>
      <AccordionDetails className="flex flex-col justify-center gap-7 bg-gray-200 rounded-md !pl-6">
        {menuLinks.map((link) => {
          return (
            <div key={link.linkName} className="p-2 text-xl text-gray-700 ">
              <Link
                onClick={() => {
                  setExpand(true);
                  handleChange(id)(undefined, false);
                }}
                href={link.href}
              >
                {link.linkName}
              </Link>
            </div>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
}

export default SubMenuLink;
