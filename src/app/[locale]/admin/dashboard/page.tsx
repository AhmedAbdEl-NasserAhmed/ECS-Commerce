import FlexWrapper from "@/ui/FlexWrapper/FlexWrapper";
import { Box } from "@mui/material";
import { RiUserSharedFill } from "react-icons/ri";
import { HiCube, HiFolder } from "react-icons/hi2";
import { BsFillCartCheckFill } from "react-icons/bs";

function page() {
  const data = [
    {
      value: "1,503",
      title: "Daily Signups",
      icon: <RiUserSharedFill />,
      className: "bg-gradient-to-r from-cyan-500 to-blue-500",
    },
    {
      value: "2,201",
      title: "Daily Order",
      icon: <BsFillCartCheckFill />,
      className: "bg-gradient-to-r from-sky-500 to-indigo-500",
    },
    {
      value: "31,503",
      title: "Products",
      icon: <HiCube />,
      className: "bg-gradient-to-r from-violet-500 to-fuchsia-500",
    },
    {
      value: "11,503",
      title: "Categories",
      icon: <HiFolder />,
      className: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
  ];
  return (
    <div className="px-[4rem] py-[1.2rem]">
      {/* <Box className="grid gap-4 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1"> */}
      <FlexWrapper className="gap-9 h-44">
        {data.map((dataItem) => {
          return (
            <Box
              key={dataItem.title}
              className={`flex items-center flex-wrap justify-between rounded-2xl gap-3 text-[white] p-8 grow ${dataItem.className}`}
            >
              <Box>
                <p className="text-6xl mb-2 font-medium">{dataItem.value}</p>
                <p className="text-xl">{dataItem.title}</p>
              </Box>
              <Box className="text-8xl">{dataItem.icon}</Box>
            </Box>
          );
        })}
      </FlexWrapper>
      {/* </Box> */}
    </div>
  );
}

export default page;
