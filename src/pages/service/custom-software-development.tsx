import React from "react";
import { services } from "../../data-sources/data";
import ServiceViewer from "./service-viewer";

export default function CustomSoftwareDevelopment() {
  const service = services.find((s) => s.id === "custom-software-development");
  return <ServiceViewer service={service} />;
}
