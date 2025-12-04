import { services } from "../../data-sources/data";
import ServiceViewer from "./service-viewer";

export default function TechnicalConsulting() {
  const service = services.find((s) => s.id === "backend-development");
  return <ServiceViewer service={service} />;
}
