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

  if (!props?.products?.length)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-3xl font-semibold">No Products Available</p>
      </div>
    );

  if (props.isLoading) return <Spinner />;

  return (
    <GridContainer
      className={"grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 my-0"}
      columns={3}
    >
      {uniqueItems?.map((product) => {
        return <ProductCard key={product["_id"]} product={product} />;
      })}
    </GridContainer>
  );
}

export default ProductList;
