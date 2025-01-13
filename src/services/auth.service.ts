import { AuthResponse, LoginCredentials, RegisterCredentials } from "../utils/interfaces/auth.interface";

export class AuthService {
  private static instance: AuthService;
  private readonly TOKEN_KEY = "auth_token";
  private readonly USER_KEY = "auth_user";
  private readonly API_URL = import.meta.env.VITE_API_URL;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private async makeRequest<T>(endpoint: string, method: string, data?: unknown): Promise<T> {
    const response = await fetch(`${this.API_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData?.result || responseData;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const authData = await this.makeRequest<AuthResponse>("/login", "POST", credentials);
      this.setSession(authData);
      return authData;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Error durante el inicio de sesión");
    }
  }

  async register(credentials: RegisterCredentials) {
    try {
      return await this.makeRequest<AuthResponse>("/createClient", "POST", credentials);
    } catch (error) {
      console.error("Register error:", error);
      throw new Error("Error durante el registro");
    }
  }

  logout(): void {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    } catch (error) {
      console.error("Logout error:", error);
      throw new Error("Error durante el cierre de sesión");
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    try {
      return localStorage.getItem(this.TOKEN_KEY);
    } catch (error) {
      console.error("Get token error:", error);
      return null;
    }
  }

  getUser<T>(): T | null {
    try {
      const userData = localStorage.getItem(this.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Get user error:", error);
      return null;
    }
  }

  private setSession(authResponse: AuthResponse): void {
    try {
      localStorage.setItem(this.TOKEN_KEY, authResponse.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(authResponse.userData));
    } catch (error) {
      console.error("Set session error:", error);
      throw new Error("Error al guardar la sesión");
    }
  }
}

export const authService = AuthService.getInstance();
