import { products } from "@/DmmyData";
import { productTableHeaders } from "@/constants/productTableHeaders";
import BaseTable from "@/ui/BaseTable/BaseTable";
import { Box, Typography } from "@mui/material";

function ProductsOverview() {
  return (
    <Box className=" p-[1.8rem] md:p-[4rem]" component="div">
      <Typography
        className="text-cyan-500 font-semibold mb-8 "
        variant="h4"
        component="h4"
      >
        PRODUCTS OVERVIEW
      </Typography>
      <BaseTable tableHeaders={productTableHeaders} content={products} />
    </Box>
  );
}

export default ProductsOverview;
