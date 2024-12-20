"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import { HiMenuAlt3 } from "react-icons/hi";
import { useRouter } from "next/navigation";
import LanguageSelector from "@/ui/LanguageSelector/LanguageSelector";
import AdminProfileMenu from "./AdminProfileMenu";

interface Props {
  setExpand?: (isTrue: any) => void;
  setExpanded: Dispatch<SetStateAction<string | false>>;
}

function Navbar({ setExpand, setExpanded }: Props) {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  return (
    <Box
      component="nav"
      display="flex"
      alignItems="center"
      className=" h-[10vh] px-8 border-b-2 py-12 bg-[#FFFFFF] sticky top-0 z-50 border-gray-100 justify-between"
    >
      <Box
        display="flex"
        alignItems="center"
        className="justify-between w-full "
      >
        <Box className="flex items-center w-full gap-6  ">
          <span
            className="text-4xl cursor-pointer"
            onClick={() => {
              setExpanded(false);
              setExpand((prev) => !prev);
            }}
          >
            <HiMenuAlt3 />
          </span>
        </Box>
      </Box>
      <ul className="flex items-center justify-end gap-5 w-1/2   ">
        <li
          className="relative"
          onClick={() => setIsProfileOpen((open) => !open)}
        >
          <Image
            src="/profile.png"
            alt="profile"
            width={22}
            height={22}
            className=" cursor-pointer"
          />
          {isProfileOpen && (
            <AdminProfileMenu setIsProfileOpen={setIsProfileOpen} />
          )}
        </li>
        <LanguageSelector />
      </ul>
    </Box>
  );
}

export default Navbar;
