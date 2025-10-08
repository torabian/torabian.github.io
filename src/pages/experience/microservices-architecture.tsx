import React from "react";
import { experiences } from "../../data-sources/data";
import ExperienceViewer from "./experience-viewer";

export default function MicroservicesArchitecture() {
  const experience = experiences.find(
    (exp) => exp.id === "microservices-architecture"
  );
  return <ExperienceViewer experience={experience} />;
}
