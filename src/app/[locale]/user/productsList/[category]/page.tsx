"use client";

import Filter from "@/components/Filter/Filter";
import TitledProductList from "@/components/TitledProductList/TitledProductList";
import { useGetAllProductsQuery } from "@/lib/features/api/productsApi";
import BaseContainer from "@/ui/Container/BaseContainer";

import Spinner from "@/ui/Spinner/Spinner";
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
    categoryId: category,
    min: minPrice || undefined,
    max: maxPrice || undefined,
    size: size || undefined,
    colors: colors || undefined,
    subCategory: subCategory || undefined,
    page,
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
    if (data?.data.length) {
      setProducts((prevProducts) => {
        if (page === 1) {
          return data?.data;
        } else {
          return [...new Set([...prevProducts, ...data?.data])];
        }
      });
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [data?.data, page]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    replace(`${pathName}?${params.toString()}`, { scroll: false });
  }, [page, pathName, replace, searchParams]);

  useEffect(() => {
    setPage(1);
    setProducts(data?.data);
  }, [minPrice, size, maxPrice, colors, subCategory, data?.data]);

  console.log(data);

  if (isFetching) return <Spinner />;

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
      {hasMore && 1 !== page && (
        <div className="flex justify-center items-center p-12" ref={elementRef}>
          <Spinner />
        </div>
      )}
    </BaseContainer>
  );
}

export default ProductsByCategory;
