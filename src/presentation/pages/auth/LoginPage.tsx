import React, { FormEvent } from "react";
import "../../styles/auth.css";
import { AuthService } from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";

const authService = new AuthService();

export const LoginPage: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const formRef = React.useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      const response = await authService.login(data);
      console.log("Login successful:", response);
      formRef.current?.reset();
      navigate('dashboard')

    } catch (err) {
      setError("Error al iniciar sesión. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Iniciar Sesión</h1>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Correo electrónico
            </label>
            <input id="email" name="email" type="email" className="form-input" required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Contraseña
            </label>
            <input id="password" name="password" type="password" className="form-input" required />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? <div className="spinner" /> : "Iniciar Sesión"}
          </button>
        </form>
        <a href="/register" className="auth-link">
          ¿No tienes una cuenta? Regístrate
        </a>
      </div>
    </div>
  );
};
