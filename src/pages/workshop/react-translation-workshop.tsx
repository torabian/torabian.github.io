import React from "react";
import { workshops } from "../../data-sources/data";
import WorkshopViewer from "./workshop-viewer";

export default function ReactTranslationWorkshop() {
  const workshop = workshops.find((w) => w.id === "react-translation-workshop");
  return <WorkshopViewer workshop={workshop} />;
}
