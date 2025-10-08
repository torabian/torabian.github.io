import React from "react";
import { experiences } from "../../data-sources/data";
import ExperienceViewer from "./experience-viewer";

export default function ReactNativeMobileDevelopment() {
  const experience = experiences.find(
    (exp) => exp.id === "react-native-mobile-development"
  );
  return <ExperienceViewer experience={experience} />;
}
