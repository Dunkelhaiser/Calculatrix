import React from "react";
import ReactDOM from "react-dom/client";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import App from "./App";
import "./index.css";
import ThemeContextProvider from "./context/ThemeContext";

if (`${import.meta.env.VITE_NODE_ENV}` === "production") {
    disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ThemeContextProvider>
            <App />
        </ThemeContextProvider>
    </React.StrictMode>
);
