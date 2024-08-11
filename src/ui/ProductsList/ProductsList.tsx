"use client";

import Spinner from "../Spinner/Spinner";

import { getUniqueValues } from "@/lib/helpers";
import ProductCard from "../ProductCard/ProductCard";
import GridContainer from "@/ui/Container/GridContainer";
import { useTranslations } from "next-intl";

interface IProductList {
  products: any[];
  isLoading: boolean;
  columns?: number;
}

function ProductList(props: IProductList) {
  const t = useTranslations("user");

  if (!props?.products?.length)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-3xl font-semibold">{t("No Products Available")}</p>
      </div>
    );

  if (props.isLoading) return <Spinner />;

  return (
    <GridContainer
      className={"grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 my-0"}
      columns={props.columns || 3}
    >
      {props.products?.map((product) => {
        return <ProductCard key={product["_id"]} product={product} />;
      })}
    </GridContainer>
  );
}

export default ProductList;
