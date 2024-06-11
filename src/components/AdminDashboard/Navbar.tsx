"use client";

import Image from "next/image";
import { FaAngleDown, FaSearch } from "react-icons/fa";
import { HiOutlineBell } from "react-icons/hi2";
import { Box, InputAdornment, TextField } from "@mui/material";
import CustomizedTextField from "@/ui/TextField/TextField";
import { HiMenuAlt3 } from "react-icons/hi";

interface Props {
  setExpand?: (isTrue: any) => void;
}

function Navbar({ setExpand }: Props) {
  return (
    <Box
      component="nav"
      display="flex"
      alignItems="center"
      className="h-[10vh] border-b-2  bg-[#FFFFFF] sticky top-0 border-gray-100 justify-between"
    >
      <Box
        component="div"
        display="flex"
        alignItems="center"
        className="px-8 justify-between py-12 w-full "
      >
        <Box component="div" className="flex items-center w-full gap-6  ">
          <span
            className="text-4xl cursor-pointer"
            onClick={() => setExpand((prev: boolean) => !prev)}
          >
            <HiMenuAlt3 />
          </span>
          <Box component="div" className="w-1/2">
            <CustomizedTextField
              type="text"
              size="small"
              placeholder="Search.."
              variant="outlined"
              sx={{
                width: "100%",
                input: {
                  fontSize: "1.4rem",
                },

                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    backgroundColor: "#ebebeb46",
                    borderRadius: "20px",
                  },

                  "&.Mui-focused fieldset": {
                    borderWidth: "1px",
                    borderColor: "#dcdbdb",
                  },

                  "&:hover fieldset": {
                    borderColor: "#dcdbdb",
                  },

                  "& .MuiInputBase-input": {
                    paddingBlock: "0.8rem",
                    paddingInline: "1.8rem",
                    fontSize: "1.5rem",
                    color: "#525151",

                    "&::placeholder": {
                      color: "#878787",
                      fontSize: "1.5rem",
                      opacity: 1,
                    },
                  },
                },
              }}
              inputProps={{
                endAdornment: (
                  <InputAdornment
                    style={{ fontSize: "1.25rem" }}
                    position="end"
                  >
                    <FaSearch />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        <ul className="flex items-center gap-3 sm:gap-5 text-3xl ">
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
      </Box>
    </Box>
  );
}

export default Navbar;
