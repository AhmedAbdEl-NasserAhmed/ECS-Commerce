import { products } from "@/DmmyData";
import { productTableHeaders } from "@/constants/productTableHeaders";
import BaseTable from "@/ui/BaseTable/BaseTable";
import Menus from "@/ui/Menus/Menus";
import { Box } from "@mui/material";

function ProductsOverview() {
  return (
    <Box className=" p-[1rem] md:p-[4rem] w-full  " component="div">
      <h2 className="text-xl sm:text-3xl text-cyan-500 font-semibold mb-12 ">
        PRODUCTS OVERVIEW
      </h2>
      <Menus>
        <BaseTable tableHeaders={productTableHeaders} content={products} />
      </Menus>
    </Box>
  );
}

export default ProductsOverview;
