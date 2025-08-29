/** @jsxImportSource preact */
import { useState } from "preact/hooks";

import useAuth from "../../hooks/useAuth.ts";
import { LoginInput, LoginSchema } from "../../schemas/auth.ts";

/**
 * Componente de formulario de autenticación de usuarios
 * @returns 
 */
export default function AuthForm() {
  const { login, loading, error } = useAuth();
  const [form, setForm] = useState<LoginInput>({ username: "", password: "" });
  const [validationError, setValidationError] = useState<string | null>(null);

  const onSubmit = async (e: Event) => {
    e.preventDefault();

    const parsed = LoginSchema.safeParse(form);
    if (!parsed.success) {
      setValidationError(parsed.error.issues[0]?.message ?? "Datos inválidos");
      return;
    }

    setValidationError(null);
    const response = await login(parsed.data);

    if (response) {
      globalThis.window.location.href = "/dashboard";
      return;
    }

    setValidationError("Usuario o contraseña incorrectos");
  };

  return (
    <form
      onSubmit={onSubmit}
      class="bg-white p-6 rounded shadow-md w-80 space-y-4"
    >
      <h2 class="text-xl font-bold text-center">Iniciar sesión</h2>

      {error && <p class="text-red-600 text-sm">{error}</p>}
      {validationError && <p class="text-red-600 text-sm">{validationError}</p>}

      <input
        type="text"
        placeholder="Usuario"
        value={form.username}
        onInput={(e) =>
          setForm((s: LoginInput) => ({ ...s, username: (e.target as HTMLInputElement).value }))
        }
        class="w-full border rounded px-3 py-2"
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={form.password}
        onInput={(e) =>
          setForm((s: LoginInput) => ({ ...s, password: (e.target as HTMLInputElement).value }))
        }
        class="w-full border rounded px-3 py-2"
      />
        <a href="/auth/register" class="text-sm text-blue-600 hover:underline">
          ¿No tienes cuenta? Regístrate
        </a>
      <button
        type="submit"
        disabled={loading}
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
