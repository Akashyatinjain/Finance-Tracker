import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {
  ClerkProvider,
  ClerkLoaded,
  ClerkLoading
} from "@clerk/clerk-react";
import { ThemeProvider } from "./context/ThemeContext"; // ✅ Add this import
import "./index.css";

const clerkPubKey = "pk_test_aW5jbHVkZWQtcm91Z2h5LTIuY2xlcmsuYWNjb3VudHMuZGV2JA";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <ThemeProvider> {/* ✅ Wrap app in ThemeProvider */}
        <BrowserRouter>
          <ClerkLoading>
            <div className="text-center mt-10 text-black dark:text-white">
              Loading Clerk...
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <App />
          </ClerkLoaded>
        </BrowserRouter>
      </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>
);
