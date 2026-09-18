import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { NewsProvider } from "./context/NewsContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/news-website/">
      <NewsProvider>
        <App />
      </NewsProvider>
    </BrowserRouter>
  </StrictMode>
);