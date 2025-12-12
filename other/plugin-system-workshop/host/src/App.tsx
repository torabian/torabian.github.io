import { Suspense } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useHooks } from "./pluginManager";
import Layout from "./Layout";

export default function App() {
  const { routes } = useHooks();


  return (
    <BrowserRouter>
      <Layout routes={routes}>
        <Suspense fallback="Loading...">
          <Routes>
            {routes.map(r => (
              <Route key={r.path} path={r.path} element={<r.component />} />
            ))}
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
