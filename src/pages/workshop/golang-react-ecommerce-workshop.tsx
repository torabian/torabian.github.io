import React from "react";
import { workshops } from "../../data-sources/data";
import WorkshopViewer from "./workshop-viewer";

export default function ReactArchitectureWorkshop() {
  const workshop = workshops.find(
    (w) => w.id === "golang-react-ecommerce-workshop"
  );
  return <WorkshopViewer workshop={workshop!} />;
}
