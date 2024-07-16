"use client";

import Filter from "@/components/Filter/Filter";
import TitledProductList from "@/components/TitledProductList/TitledProductList";
import { useGetAllProductsQuery } from "@/lib/features/api/productsApi";
import BaseContainer from "@/ui/Container/BaseContainer";

import Spinner from "@/ui/Spinner/Spinner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function ProductsByCategory() {
  const searchParams = useSearchParams();

  const pageUrl = searchParams.get("page");

  const [products, setProducts] = useState([]);

  const [page, setPage] = useState<number>(+pageUrl || 1);

  const [hasMore, setHasMore] = useState<boolean>(true);

  const elementRef = useRef<HTMLDivElement>(null);

  const { replace } = useRouter();

  const pathName = usePathname();

  const minPrice = searchParams.get("min");
  const size = searchParams.get("size");
  const maxPrice = searchParams.get("max");
  const colors = searchParams.get("colors");
  const subCategory = searchParams.get("subCategory");

  const { data, isFetching } = useGetAllProductsQuery({
    categoryId: "66885ced811b33a15a63271d",
    min: minPrice || undefined,
    max: maxPrice || undefined,
    size: size || undefined,
    colors: colors || undefined,
    subCategory: subCategory || undefined,
    // page,
  });

  function onIntersection(entries: IntersectionObserverEntry[]) {
    const firstEntry = entries[0];

    if (firstEntry.isIntersecting && hasMore) {
      setPage((prev) => prev + 1);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);

    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [hasMore]);

  useEffect(() => {
    if (data?.data) {
      setProducts((prevProducts) => [
        ...new Set([...prevProducts, ...data?.data]),
      ]);
      const params = new URLSearchParams(searchParams);
      params.set("page", String(page));
      replace(`${pathName}?${params.toString()}`);
    }
  }, [page, pathName, replace, searchParams, data?.data]);

  return (
    <BaseContainer className="py-0">
      <div>
        <div className="bg-white w-full sticky top-0 z-50 p-2">
          <Filter />
        </div>

        <TitledProductList
          baseContainerClass="py-0"
          products={products}
          isLoading={isFetching}
        />
      </div>
      {hasMore && (
        <div className="flex justify-center items-center" ref={elementRef}>
          <Spinner />
        </div>
      )}
    </BaseContainer>
  );
}

export default ProductsByCategory;
