import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HeroUIProvider>
  </StrictMode>
);
