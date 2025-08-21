import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";

// Layouts
import ProtectedLayout from "./layouts/ProtectedLayout";
import AuthLayout from "./layouts/AuthLayout";

// Pages
import HomePage from "./pages/HomePage.jsx";
import { SignIn, SignUp } from "@clerk/clerk-react";

function RedirectIfSignedIn({ children }) {
  const { isSignedIn } = useUser();
  if (isSignedIn) return <Navigate to="/app" replace />;
  return children;
}

const App = () => {
  return (
    <Routes>
      {/* Landing Page for users not logged in */}
      <Route
        path="/"
        element={
          <RedirectIfSignedIn>
            <HomePage />
          </RedirectIfSignedIn>
        }
      />

      {/* Clerk Auth Pages */}
      <Route
        path="/sign-in"
        element={
          <AuthLayout>
            <SignIn routing="path" path="/sign-in" />
          </AuthLayout>
        }
      />
      <Route
        path="/sign-up"
        element={
          <AuthLayout>
            <SignUp routing="path" path="/sign-up" />
          </AuthLayout>
        }
      />

      {/* Protected App Pages */}
      <Route
        path="/app/*"
        element={
          <SignedIn>
            <ProtectedLayout />
          </SignedIn>
        }
      />

      {/* Redirect unauthorized access */}
      <Route
        path="/app/*"
        element={
          <SignedOut>
            <Navigate to="/" replace />
          </SignedOut>
        }
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
