"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { FaAngleDown, FaSearch } from "react-icons/fa";
import { HiOutlineBell } from "react-icons/hi2";
import { Box, InputAdornment } from "@mui/material";
import CustomizedTextField from "@/ui/TextField/TextField";
import { HiMenuAlt3 } from "react-icons/hi";
import { useParams, usePathname, useRouter } from "next/navigation";

interface Props {
  setExpand?: (isTrue: any) => void;
  setExpanded: Dispatch<SetStateAction<string | false>>;
}

function Navbar({ setExpand, setExpanded }: Props) {
  const pathname = usePathname();

  const router = useRouter();

  const { locale } = useParams();

  const [langState, setLangState] = useState(locale);

  const onChangeLanguage = (value: string) => {
    setLangState(value);

    const newPath = pathname.replace(`/${locale}`, `/${value}`);

    router.push(newPath);
  };
  return (
    <Box
      component="nav"
      display="flex"
      alignItems="center"
      className="h-[10vh] border-b-2 bg-[#FFFFFF] sticky top-0 z-50 border-gray-100 justify-between"
    >
      <Box
        display="flex"
        alignItems="center"
        className="px-8 justify-between py-12 w-full "
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
          <Box className="w-1/2">
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
          {/* <li className="flex justify-center items-center gap-2 ">
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
          </li> */}
          {/* <li>
            <HiOutlineBell />
          </li> */}
          <li>
            <select
              value={langState}
              onChange={(e) => onChangeLanguage(e.target.value)}
            >
              <option value="en">EN</option>
              <option value="ar">AR</option>
            </select>
          </li>
        </ul>
      </Box>
    </Box>
  );
}

export default Navbar;
