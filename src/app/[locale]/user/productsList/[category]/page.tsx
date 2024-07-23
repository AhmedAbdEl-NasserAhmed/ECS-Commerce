"use client";

import Filter from "@/components/Filter/Filter";
import TitledProductList from "@/components/TitledProductList/TitledProductList";
import {
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,
} from "@/lib/features/api/productsApi";
import BaseContainer from "@/ui/Container/BaseContainer";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import ResponsiveMobileFilters from "@/ui/ResponsiveMobileFilters/ResponsiveMobileFilters";

import Spinner from "@/ui/Spinner/Spinner";
import { Button } from "@mui/material";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BsFilterLeft } from "react-icons/bs";

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
  const sort = searchParams.get("sort");
  const sale = searchParams.get("sale");

  const { data, isLoading, isFetching } = useGetAllProductsQuery({
    categoryId: category,
    min: minPrice || undefined,
    max: maxPrice || undefined,
    size: size || undefined,
    colors: colors || undefined,
    subCategory: subCategory || undefined,
    sort: sort || "",
    sale: sale || "",
    limit: 4,
    page,
  });

  useEffect(() => {
    if (minPrice || maxPrice || size || colors || subCategory || sort) {
      setPage(1);
      setProducts([]);
    }
  }, [minPrice, maxPrice, size, colors, subCategory, sort]);

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
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    replace(`${pathName}?${params.toString()}`, { scroll: false });
  }, [page, pathName, replace, searchParams]);

  const ref = useRef(null);

  const [isScrollPassedFilterEl, setIsScrollPassedFilterEl] =
    useState<boolean>(false);

  useEffect(() => {
    const scroll = (e) => {
      if (ref.current) {
        const element = ref.current.getBoundingClientRect();
        setIsScrollPassedFilterEl(element.top <= 0);
      }
    };

    window.addEventListener("scroll", scroll);

    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  if (!data) return <Spinner />;
  return (
    <>
      <div ref={ref}>
        <div className="relative grid grid-cols-[1fr] md:grid-cols-[23rem_1fr] gap-5">
          <div
            onClick={() => setShowMobileFilters(true)}
            className=" absolute top-0 left-0 md:hidden mb-5 mt-3 flex items-center gap-3 cursor-pointer "
          >
            <BsFilterLeft size={"3rem"} />
            <p className="text-[3rem] font-bold ">Filters</p>
          </div>

          <div className="block md:hidden">
            <ResponsiveMobileFilters
              setShowMobileFilters={setShowMobileFilters}
              showMobileFilters={showMobileFilters}
            />
          </div>

          <div className="hidden md:block">
            <Filter isScrollPassedFilterEl={isScrollPassedFilterEl} />
          </div>

          <div>
            <TitledProductList
              baseContainerClass="py-0"
              products={products}
              isLoading={isLoading}
            />
            {data?.pagesNumber !== page &&
              data?.pagesNumber > 2 &&
              data?.data.length > 0 && (
                <div
                  ref={elementRef}
                  className="flex w-full md:w-1/2 items-center m-auto justify-center p-12"
                >
                  <Button
                    disabled={isFetching}
                    onClick={() => setPage((page) => page + 1)}
                    sx={{
                      width: "20rem",
                      height: "5rem",
                      background: "transparent",
                      boxShadow: "none",
                      border: "2px dashed #ed0534",
                      padding: "0.85rem",
                      color: "#ed0534",
                      fontSize: "1.2rem",
                      "&:hover": {
                        border: "2px dashed #000",
                        color: "#000",
                        background: "transparent",
                        boxShadow: "none",
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
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsByCategory;
