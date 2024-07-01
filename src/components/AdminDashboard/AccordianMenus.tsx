import Accordian from "@/ui/Accordian/Accordian";
import { Box } from "@mui/material";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { HiChevronRight, HiOutlineCube } from "react-icons/hi2";

function AccordianMenus({ expand, setExpand }) {
  const params = usePathname();

  const { locale } = useParams();
  return (
    <>
      <Accordian.Toggle id="product">
        <Box className="flex items-center justify-between text-xl font-semibold">
          <div className="flex items-center gap-4">
            <span className="text-4xl ">
              <HiOutlineCube
                style={{
                  color: params.includes("product") ? "#5b93ff" : "",
                }}
              />
            </span>
            <p
              className={` 
         ${expand ? "opacity-0" : "opacity-1"}
         ${expand ? "translate-x-[40rem]" : "translate-x-0"}
          group-hover:block group-hover:opacity-100 group-hover:translate-x-0 text-gray-700 transition-opacity transition-opacity-500 transition-transform-500 ease-in-out`}
            >
              PRODUCTS
            </p>
          </div>

          <span className="text-xl transition-all duration-500">
            <HiChevronRight />
          </span>
        </Box>

        <span
          style={{ opacity: params.includes("product") ? "1" : "0" }}
          className="w-2 h-3/4 transition-opacity duration-500 rounded-2xl absolute bg-[#5b93ff] left-0 top-4"
        ></span>
      </Accordian.Toggle>
      <Accordian.List
        close={expand}
        className="flex flex-col justify-center items-center gap-7 bg-gray-200 rounded-md "
        id="product"
      >
        <li className="p-4 text-xl text-gray-700">
          <Link
            onClick={() => setExpand(true)}
            href={`/${locale}/admin/dashboard/product`}
          >
            Add Product
          </Link>
        </li>
        <li className="p-4 text-xl text-gray-700">
          <Link
            onClick={() => setExpand(true)}
            href={`/${locale}/admin/dashboard/productsOverview`}
          >
            Products OverView
          </Link>
        </li>
      </Accordian.List>
    </>
  );
}

export default AccordianMenus;
