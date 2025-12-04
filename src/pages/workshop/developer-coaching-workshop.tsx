import React from "react";
import { workshops } from "../../data-sources/data";
import WorkshopViewer from "./workshop-viewer";

export default function MasteringFirebackWorkshop() {
  const workshop = workshops.find(
    (w) => w.id === "developer-coaching-workshop"
  );
  return <WorkshopViewer workshop={workshop!} />;
}
