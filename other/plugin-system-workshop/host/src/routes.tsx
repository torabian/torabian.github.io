import { lazy } from "react";

export const baseRoutes = [
    { path: "/", label: "Home", component: lazy(() => import("./pages/Home")) },
    { path: "/about", label: "About", component: lazy(() => import("./pages/About")) },
];
