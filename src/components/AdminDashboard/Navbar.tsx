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

interface Props {
  setExpand?: (isTrue: any) => void;
  setExpanded: Dispatch<SetStateAction<string | false>>;
}

function Navbar({ setExpand, setExpanded }: Props) {
  const pathname = usePathname();

  const router = useRouter();

  const { locale } = useParams();

  const [langState, setLangState] = useState(locale);

  const dispatch = useAppDispatch();

  function handleLogoutAdmin() {
    dispatch(logoutUser());
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    router.push(`/${locale}/admin`);
    toast.success("Do Not Be Late");
  }

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
      </Box>
      <ul className="flex items-center justify-end gap-5 w-1/2   ">
        <li className="text-3xl">
          <select
            value={langState}
            onChange={(e) => onChangeLanguage(e.target.value)}
          >
            <option value="en">EN</option>
            <option value="ar">AR</option>
          </select>
        </li>
        <li onClick={handleLogoutAdmin} className="text-2xl cursor-pointer">
          LOG OUT
        </li>
      </ul>
    </Box>
  );
}

export default Navbar;
