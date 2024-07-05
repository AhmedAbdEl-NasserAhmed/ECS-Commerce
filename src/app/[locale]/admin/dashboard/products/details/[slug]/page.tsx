"use client";

import { useGetSingleProductQuery } from "@/lib/features/api/productsApi";
import Spinner from "@/ui/Spinner/Spinner";
import { useParams } from "next/navigation";

function ProductDetails() {
  const params = useParams();

  const { data, isLoading } = useGetSingleProductQuery(params.slug);

  if (isLoading) return <Spinner />;

  return <div>{params.slug}</div>;
}

export default ProductDetails;
