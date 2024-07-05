"use client";

import { useParams } from "next/navigation";

function ProductDetails() {
  const params = useParams();

  return <div>{params.slug}</div>;
}

export default ProductDetails;
