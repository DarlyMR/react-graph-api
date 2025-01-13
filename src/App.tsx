import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./presentation/layouts/AuthLayout";
import { LoginPage } from "./presentation/pages/auth/LoginPage";
import { RegisterPage } from "./presentation/pages/auth/RegisterPage";
import { DashboardLayout } from "./presentation/layouts/DashboardLayout";
import { DashboardPage } from "./presentation/pages/dashboard/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de autenticacion */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Rutas protegidas */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        {/* Redireccionar al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Captura todas las rutas: redirige para iniciar sesión */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
