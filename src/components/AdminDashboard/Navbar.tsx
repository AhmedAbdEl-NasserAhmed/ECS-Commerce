"use client";

import Image from "next/image";
import { FaAngleDown, FaSearch } from "react-icons/fa";
import { HiOutlineBell } from "react-icons/hi2";
import { Box, InputAdornment, TextField } from "@mui/material";
import NavMenu from "./NavMenu";
import CustomizedTextField from "@/ui/TextField/TextField";

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
          <CustomizedTextField
            type="text"
            sx={{
              width: "100%",
              input: {
                fontSize: "1.4rem",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgb(6 182 212)",
                  borderRadius: "5px",
                  borderWidth: "2px",
                },

                "&:hover fieldset": {
                  borderColor: "rgb(6 182 212)",
                },

                "&.Mui-focused fieldset": {
                  borderRadius: "6px",
                  borderWidth: "3px",
                  borderColor: "rgb(6 182 212)",
                },
              },
            }}
            inputLabelProps={{ style: { fontSize: "1.25rem" } }}
            size="small"
            label="Search"
            variant="outlined"
            inputProps={{
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
