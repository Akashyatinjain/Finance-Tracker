import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {
  ClerkProvider,
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import "./loader.css";

const clerkPubKey = "pk_test_aW5jbHVkZWQtcm91Z2h5LTIuY2xlcmsuYWNjb3VudHMuZGV2JA";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <ThemeProvider>
        <BrowserRouter>
          <ClerkLoading>
            <div className="loader-container">
              <div className="emoji-loader">🪙</div>
              <p className="loader-text">Loading Finance Tracker...</p>
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
