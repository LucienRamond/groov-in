import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./index.scss";
import App from "./App.tsx";
import ThemeProvider from "./pages/providers/theme/ThemeProvider.tsx";
import ToastProvider from "./pages/providers/toast/ToastProvider.tsx";
import UserProvider from "./pages/providers/user/UserProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <UserProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </UserProvider>
    </ThemeProvider>
  </StrictMode>,
);
