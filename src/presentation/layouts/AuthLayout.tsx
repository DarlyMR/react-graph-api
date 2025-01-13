import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthService } from "../../services/auth.service";

const authService = new AuthService();

export const AuthLayout: React.FC = () => {
  if (authService.isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Outlet />
    </div>
  );
};
