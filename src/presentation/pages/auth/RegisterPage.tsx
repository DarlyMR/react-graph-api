import React, { FormEvent } from "react";
import "../../styles/auth.css";
import { AuthService } from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";

const authService = new AuthService();

export const RegisterPage: React.FC = () => {
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
        client_name: formData.get("client_name") as string,
        client_products: [0],
        address: formData.get("address") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        zipcode: formData.get("zipcode") as string,
        country: formData.get("country") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        phone: formData.get("phone") as string,
      };

      const response = await authService.register(data);
      console.log("Registration successful:", response);
      formRef.current?.reset();
      navigate('login')
    } catch (err) {
      setError("Error al registrarse. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Registro</h1>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="client_name">
              Nombre
            </label>
            <input id="client_name" name="client_name" type="text" className="form-input" required />
          </div>

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

          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              Teléfono
            </label>
            <input id="phone" name="phone" type="tel" className="form-input" pattern="^\+\d{1,15}$" placeholder="+50512345678" required />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="address">
              Dirección
            </label>
            <input id="address" name="address" type="text" className="form-input" required />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="city">
              Ciudad
            </label>
            <input id="city" name="city" type="text" className="form-input" required />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="state">
              Estado/Provincia
            </label>
            <input id="state" name="state" type="text" className="form-input" required />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="zipcode">
              Código Postal
            </label>
            <input id="zipcode" name="zipcode" type="text" className="form-input" required />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="country">
              País
            </label>
            <input id="country" name="country" type="text" className="form-input" required />
          </div>

          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? <div className="spinner" /> : "Registrarse"}
          </button>
        </form>
        <a href="/login" className="auth-link">
          ¿Ya tienes una cuenta? Inicia sesión
        </a>
      </div>
    </div>
  );
};
