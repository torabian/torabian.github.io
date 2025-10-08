import React from "react";
import { services } from "../../data-sources/data";
import ServiceViewer from "./service-viewer";

export default function TechnicalConsulting() {
  const service = services.find((s) => s.id === "technical-consulting");
  return <ServiceViewer service={service} />;
}
