import React from "react";
import { workshops } from "../../data-sources/data";
import WorkshopViewer from "./workshop-viewer";

export default function WorkshopPage() {
  // Get the workshop ID from the URL
  const workshopId =
    typeof window !== "undefined"
      ? window.location.pathname.split("/").pop()
      : "";

  // Find the workshop by ID
  const workshop = workshops.find((w) => w.id === workshopId);

  return <WorkshopViewer workshop={workshop} />;
}
