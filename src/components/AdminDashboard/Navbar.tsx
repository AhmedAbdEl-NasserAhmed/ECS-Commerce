"use client";

import Image from "next/image";
import { FaAngleDown, FaSearch } from "react-icons/fa";
import { HiOutlineBell } from "react-icons/hi2";
import { Box, InputAdornment, TextField } from "@mui/material";

import NavMenu from "./NavMenu";

function Navbar() {
  return (
    <Box
      component="nav"
      display="flex"
      alignItems="center"
      className="relative h-[10vh] bg-white border-b-2 col-span-full md:col-auto  border-gray-200 justify-between"
    >
      <Box
        component="div"
        display="flex"
        alignItems="center"
        className="px-[5rem] justify-between py-12 w-full  "
      >
        <Box component="div" className="hidden md:block w-1/2">
          <TextField
            sx={{
              width: "100%",
              input: {
                fontSize: "1.4rem",
              },
            }}
            InputLabelProps={{ style: { fontSize: "1.25rem" } }}
            size="small"
            id="outlined-basic"
            label="Search"
            variant="filled"
            InputProps={{
              endAdornment: (
                <InputAdornment style={{ fontSize: "1.25rem" }} position="end">
                  <FaSearch />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <ul className="flex items-center gap-3 sm:gap-5 text-3xl">
          <li className="flex justify-center items-center gap-2 ">
            <div className="  w-[2.4rem] h-[2.4rem] sm:w-[3rem]  sm:h-[3rem] relative ">
              <Image
                className="rounded-full  "
                src="/profile.webp"
                fill
                sizes="10vw"
                alt="Profile photo"
              />
            </div>
            <span>
              <FaAngleDown />
            </span>
          </li>

          <li>
            <HiOutlineBell />
          </li>
        </ul>
        <NavMenu />
      </Box>
    </Box>
  );
}

export default Navbar;
