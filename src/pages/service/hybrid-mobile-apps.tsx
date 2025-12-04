import React from "react";
import { services } from "../../data-sources/data";
import ServiceViewer from "./service-viewer";

export default function MobileAppDevelopment() {
  const service = services.find((s) => s.id === "hybrid-mobile-apps");
  return <ServiceViewer service={service} />;
}
