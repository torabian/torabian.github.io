import React from "react";
import { trainings } from "../../data-sources/data";
import TrainingViewer from "./training-viewer";

export default function AvoidSoftwareFailure() {
  return (
    <TrainingViewer
      training={trainings.find((t) => t.id === "avoid-software-failure")!}
    />
  );
}
