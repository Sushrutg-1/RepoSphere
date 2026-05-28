import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import RepoProvider from "./context/RepoContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RepoProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </RepoProvider>
    </AuthProvider>
  </StrictMode>,
);
