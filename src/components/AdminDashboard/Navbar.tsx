"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { FaAngleDown, FaSearch } from "react-icons/fa";
import { HiOutlineBell } from "react-icons/hi2";
import { Box, InputAdornment } from "@mui/material";
import CustomizedTextField from "@/ui/TextField/TextField";
import { HiMenuAlt3 } from "react-icons/hi";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { logoutUser } from "@/lib/features/usersSlice/usersSlice";
import toast from "react-hot-toast";
import LanguageSelector from "@/ui/LanguageSelector/LanguageSelector";

interface Props {
  setExpand?: (isTrue: any) => void;
  setExpanded: Dispatch<SetStateAction<string | false>>;
}

function Navbar({ setExpand, setExpanded }: Props) {
  const router = useRouter();

  const { locale } = useParams();

  const dispatch = useAppDispatch();

  function handleLogoutAdmin() {
    dispatch(logoutUser());
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    router.push(`/${locale}/admin`);
    toast.success("Do Not Be Late");
  }

  return (
    <Box
      component="nav"
      display="flex"
      alignItems="center"
      className="h-[10vh] px-8 border-b-2 py-12 bg-[#FFFFFF] sticky top-0 z-50 border-gray-100 justify-between"
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
        <LanguageSelector />
        <li
          onClick={handleLogoutAdmin}
          className="text-xl cursor-pointer font-semibold"
        >
          LOG OUT
        </li>
      </ul>
    </Box>
  );
}

export default Navbar;
