import React from "react";
import ReactDOM from "react-dom";

window.React = React;
window.ReactDOM = ReactDOM;

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HooksProvider } from "./pluginManager.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HooksProvider>
      <App />
    </HooksProvider>
  </StrictMode>,
)
