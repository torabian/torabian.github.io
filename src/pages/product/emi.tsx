import React from "react";
import { products, Product } from "../../data-sources/data";
import ProductPage from "../product";

export default function EmiProduct() {
  const product: Product | undefined = products.find((p) => p.id === "emi");

  return <ProductPage product={product!} />;
}
