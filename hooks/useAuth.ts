// hooks/useAuth.ts
import { useEffect, useState } from "preact/hooks";
import { authStore } from "../stores/authStore.ts";
import { LoginSchema, type LoginInput, RegisterSchema, type RegisterInput, UserSchema, User } from "../schemas/auth.ts";
import { fetchJSON } from "../helpers/fetch.ts";

/**
 * Hook para manejar la autenticación de usuarios
 * @returns state and auth functions
 */
export default function useAuth() {
  const [state, setState] = useState(authStore.getState());

  useEffect(() => {
    const unsub = authStore.subscribe(setState);
    return () => unsub();
  }, []);

  /**
   * Función para iniciar sesión con las credenciales proporcionadas
   * @param input LoginInput
   * @returns boolean indicating success
   */
  const login = async (input: LoginInput) => {
    const parsed = LoginSchema.safeParse(input);
    if (!parsed.success) {
      authStore.getState().setError(parsed.error.issues[0]?.message ?? "Datos inválidos");
      return;
    }
    authStore.getState().setLoading(true);
    authStore.getState().setError(null);
    try {
      const response = await fetchJSON<{result: boolean}>("/api/auth/login", { method: "POST", body: JSON.stringify(parsed.data) });

      return response.result;
    } catch (e) {
      authStore.getState().setError((e as Error).message);
      authStore.getState().setUser(null);
    } finally {
      authStore.getState().setLoading(false);
    }
  };

  /**
   * Función para registrar un nuevo usuario
   * @param input RegisterInput
   */
  const register = async (input: RegisterInput) => {
    const parsed = RegisterSchema.safeParse(input);
    if (!parsed.success) {
      authStore.getState().setError(parsed.error.issues[0]?.message ?? "Datos inválidos");
      return;
    }
    authStore.getState().setLoading(true);
    authStore.getState().setError(null);
    try {
      const payload = {
        username: parsed.data.username,
        email: parsed.data.email,
        password: parsed.data.password,
      };
      await fetchJSON("/api/auth/register", { method: "POST", body: JSON.stringify(payload) });

    } catch (e) {
      authStore.getState().setError((e as Error).message);
      authStore.getState().setUser(null);
    } finally {
      authStore.getState().setLoading(false);
    }
  };

  /**
   * Función para cerrar sesión del usuario actual
  */
  const logout = async () => {
    authStore.getState().setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
    } finally {
      authStore.getState().reset();
    }
  };

  return {
    ...state,
    login,
    register,
    logout,
  };
}
