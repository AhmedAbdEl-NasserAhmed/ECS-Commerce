"use client";

import Filter from "@/components/Filter/Filter";
import TitledProductList from "@/components/TitledProductList/TitledProductList";
import {
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,
} from "@/lib/features/api/productsApi";
import BaseContainer from "@/ui/Container/BaseContainer";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";

import Spinner from "@/ui/Spinner/Spinner";
import { Button } from "@mui/material";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useRef, useState } from "react";

function ProductsByCategory() {
  const searchParams = useSearchParams();

  const { category } = useParams();

  const pageUrl = searchParams.get("page");

  const [products, setProducts] = useState([]);

  const [page, setPage] = useState<number>(1 || +pageUrl);

  const elementRef = useRef<HTMLDivElement>(null);

  const { replace } = useRouter();

  const pathName = usePathname();

  const minPrice = searchParams.get("min");
  const size = searchParams.get("size");
  const maxPrice = searchParams.get("max");
  const colors = searchParams.get("colors");
  const subCategory = searchParams.get("subCategory");

  const { data, isLoading, isFetching } = useGetAllProductsQuery({
    categoryId: category,
    min: minPrice || undefined,
    max: maxPrice || undefined,
    size: size || undefined,
    colors: colors || undefined,
    subCategory: subCategory || undefined,
    page,
  });

  useEffect(() => {
    if (data?.data.length) {
      setProducts((prevData) => {
        if (page === 1) {
          return data?.data;
        } else {
          return [...prevData, ...data?.data];
        }
      });
    }
  }, [data?.data, page]);

  useEffect(() => {
    if (minPrice || maxPrice || size || colors || subCategory) {
      setPage(1);
      setProducts([]);
    }
  }, [minPrice, maxPrice, size, colors, subCategory]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    replace(`${pathName}?${params.toString()}`, { scroll: false });
  }, [page, pathName, replace, searchParams]);

  if (!data) return <Spinner />;

  return (
    <BaseContainer className="py-0">
      <div>
        <div className="bg-white w-full sticky top-0 z-50 p-2">
          <Filter />
        </div>
        <div>
          <TitledProductList
            baseContainerClass="py-0"
            products={products}
            isLoading={isLoading}
          />
        </div>
      </div>
      {data?.pagesNumber !== page && data?.pagesNumber > 2 && (
        <div
          ref={elementRef}
          className="flex w-full md:w-1/2 items-center m-auto justify-center p-12"
        >
          <Button
            disabled={isFetching}
            onClick={() => setPage((page) => page + 1)}
            sx={{
              width: "100%",
              padding: "0.85rem",
              fontSize: "1.2rem",
              backgroundColor: "#ed0534",
              "&:hover": {
                backgroundColor: "#161616",
              },
            }}
            type="button"
            variant="contained"
            size="large"
          >
            {isFetching ? <MiniSpinner /> : "Show More"}
          </Button>
        </div>
      )}
    </BaseContainer>
  );
}

export default ProductsByCategory;
