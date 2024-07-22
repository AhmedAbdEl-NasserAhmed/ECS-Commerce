"use client";

import Spinner from "../Spinner/Spinner";

import { getUniqueValues } from "@/lib/helpers";
import ProductCard from "../ProductCard/ProductCard";
import GridContainer from "@/ui/Container/GridContainer";

interface IProductList {
  products: any[];
  isLoading: boolean;
}

function ProductList(props: IProductList) {
  const uniqueItems = getUniqueValues(props.products, ["name"]);

  if (props.isLoading) return <Spinner />;

  return (
    <GridContainer>
      {uniqueItems?.map((product) => {
        return <ProductCard key={product["_id"]} product={product} />;
      })}
    </GridContainer>
  );
}

export default ProductList;
