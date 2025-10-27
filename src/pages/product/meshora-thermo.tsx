import React, { useRef } from "react";
import { products, Product } from "../../data-sources/data";
import ProductPage from "../product";

export default function MeshoraThermo() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const product: Product | undefined = products.find(
    (p) => p.id === "meshora-thermo"
  );

  const handleFullscreen = () => {
    const iframeEl = iframeRef.current;
    if (iframeEl?.requestFullscreen) {
      iframeEl.requestFullscreen();
    } else if ((iframeEl as any)?.webkitRequestFullscreen) {
      (iframeEl as any).webkitRequestFullscreen(); // Safari fallback
    }
  };

  return (
    <ProductPage product={product!}>
      <button onClick={handleFullscreen}>Fullscreen</button>

      <iframe
        allowFullScreen
        ref={iframeRef}
        src="https://torabian.github.io/meshora-thermo/"
        width={"100%"}
        style={{ height: "60vh" }}
      />
    </ProductPage>
  );
}
