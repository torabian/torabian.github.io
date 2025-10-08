import React from "react";
import { products, Product } from "../../data-sources/data";
import ProductPage from "../product";

export default function FirebackProduct() {
  const product: Product | undefined = products.find(
    (p) => p.id === "fireback"
  );

  return <ProductPage product={product!} />;
}
