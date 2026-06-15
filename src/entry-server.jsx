import React from "react";
import { renderToString } from "react-dom/server";
import { App } from "./App.jsx";
import "./styles.css";

export function render(path) {
  return renderToString(
    <React.StrictMode>
      <App initialPath={path} />
    </React.StrictMode>,
  );
}
