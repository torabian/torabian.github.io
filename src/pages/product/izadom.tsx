import { useEffect, useRef, useState } from "react";
import { Product, products } from "../../data-sources/data";
import ProductPage from "../product";

export default function IzadomProduct() {
  const product: Product | undefined = products.find((p) => p.id === "izadom");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [demoDrawing, setDemoDrawing] = useState<any>(null);

  useEffect(() => {
    fetch("/demo.izadom")
      .then((r) => r.json())
      .then((data) => {
        setDemoDrawing(data);
      });
  }, []);

  const [isIframeReady, setIframeReady] = useState(false);

  useEffect(() => {
    if (isIframeReady && iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        { type: "loadData", payload: demoDrawing },
        "*"
      );
    }
  }, [isIframeReady, demoDrawing]);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data === "izadom-ready") {
        setIframeReady(true);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleFullscreen = () => {
    const iframeEl = iframeRef.current;
    if (iframeEl?.requestFullscreen) {
      iframeEl.requestFullscreen();
    } else if ((iframeEl as any)?.webkitRequestFullscreen) {
      (iframeEl as any).webkitRequestFullscreen(); // Safari fallback
    }
  };

  return (
    <>
      <ProductPage product={product!}>
        <h3>Demo</h3>

        <button onClick={handleFullscreen}>Fullscreen</button>

        <iframe
          allowFullScreen
          ref={iframeRef}
          src="https://torabian.github.io/izadom/"
          width={"100%"}
          style={{ height: "60vh" }}
        />
      </ProductPage>
    </>
  );
}
