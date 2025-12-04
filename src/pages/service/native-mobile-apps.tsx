import { services } from "../../data-sources/data";
import ServiceViewer from "./service-viewer";

export default function TechnicalConsulting() {
  const service = services.find((s) => s.id === "native-mobile-apps");
  return <ServiceViewer service={service} />;
}
