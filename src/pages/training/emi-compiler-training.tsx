import React from "react";
import { trainings } from "../../data-sources/data";
import TrainingViewer from "./training-viewer";

export default function EmiCompilerTraining() {
  return (
    <TrainingViewer
      training={trainings.find((t) => t.id === "emi-compiler-training")!}
    />
  );
}
