import { products } from "@/DmmyData";
import { productTableHeaders } from "@/constants/productTableHeaders";
import BaseTable from "@/ui/BaseTable/BaseTable";
import { Box, Typography } from "@mui/material";

function ProductsOverview() {
  return (
    <Box className=" p-[1rem] md:p-[4rem] w-full  " component="div">
      <h2 className="text-xl sm:text-3xl text-cyan-500 font-semibold mb-12 ">
        PRODUCTS OVERVIEW
      </h2>
      <BaseTable tableHeaders={productTableHeaders} content={products} />
    </Box>
  );
}

export default ProductsOverview;
