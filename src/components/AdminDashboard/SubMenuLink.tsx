import Accordian from "@/ui/Accordian/Accordian";
import { Box } from "@mui/material";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import { HiChevronRight, HiOutlineCube } from "react-icons/hi2";

function SubMenuLink({ expand, setExpand, id, menuName, menuLinks, icon }) {
  const params = usePathname();

  const SubmenuIcon = function () {
    const _icon = React.cloneElement(icon, {
      style: {
        color: params.includes(id) ? "#5b93ff" : "",
      },
    });

    return _icon;
  };

  return (
    <>
      <Accordian.Toggle id={id}>
        <Box className="flex items-center justify-between text-xl font-semibold">
          <div className="flex items-center gap-4">
            <span className="text-4xl ">
              <SubmenuIcon />
            </span>
            <p
              className={` 
         ${expand ? "opacity-0" : "opacity-1"}
         ${expand ? "translate-x-[40rem]" : "translate-x-0"}
          group-hover:block group-hover:opacity-100 group-hover:translate-x-0 text-gray-700 transition-opacity transition-opacity-500 transition-transform-500 ease-in-out`}
            >
              {menuName}
            </p>
          </div>

          <span className="text-xl transition-all duration-500">
            <HiChevronRight />
          </span>
        </Box>

        <span
          style={{ opacity: params.includes(id) ? "1" : "0" }}
          className="w-2 h-3/4 transition-opacity duration-500 rounded-2xl absolute bg-[#5b93ff] left-0 top-4"
        ></span>
      </Accordian.Toggle>
      <Accordian.List
        close={expand}
        className="flex flex-col justify-center items-center gap-7 bg-gray-200 rounded-md "
        id={id}
      >
        {menuLinks.map((link) => {
          return (
            <li key={link.linkName} className="p-4 text-xl text-gray-700">
              <Link onClick={() => setExpand(true)} href={link.href}>
                {link.linkName}
              </Link>
            </li>
          );
        })}
      </Accordian.List>
    </>
  );
}

export default SubMenuLink;
