import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";

// Layouts
import ProtectedLayout from "./layouts/ProtectedLayout"; // Main layout after login
import AuthLayout from "./layouts/AuthLayout";           // Layout for auth pages

const App = () => {
  return (
    <Routes>
      {/* 🔓 Public Routes: Sign In / Sign Up */}
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

      {/* 🔐 Protected Routes: Only visible to signed-in users */}
      <Route
        path="/*"
        element={
          <>
            <SignedIn>
              {/* Renders the full app layout after login */}
              <ProtectedLayout />
            </SignedIn>
            <SignedOut>
              {/* Redirects to sign-in if user is not authenticated */}
              <Navigate to="/sign-in" />
            </SignedOut>
          </>
        }
      />
    </Routes>
  );
};

export default App;
