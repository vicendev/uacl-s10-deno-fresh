import { useState } from "preact/hooks";

import useAuth from "../../hooks/useAuth.ts";
import { RegisterInput, RegisterSchema } from "../../schemas/auth.ts";

/**
 * Componente de formulario de registro de usuarios
 * @returns 
 */
export default function RegisterForm() {
  const { register, loading, error } = useAuth();
  const [form, setForm] = useState<RegisterInput>({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [validationError, setValidationError] = useState<string | null>(null);

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    const parsed = RegisterSchema.safeParse(form);
    if (!parsed.success) {
      setValidationError(parsed.error.issues[0]?.message ?? "Datos inválidos");
      return;
    }
    setValidationError(null);
    await register(parsed.data);

    globalThis.window.location.href = "/auth/login";
  };

  return (
    <form
      onSubmit={onSubmit}
      class="bg-white p-6 rounded shadow-md w-96 space-y-4"
    >
      <h2 class="text-xl font-bold text-center">Crear cuenta</h2>

      {error && <p class="text-red-600 text-sm">{error}</p>}
      {validationError && <p class="text-red-600 text-sm">{validationError}</p>}

      <input
        type="text"
        placeholder="Usuario"
        value={form.username}
        onInput={(e) =>
          setForm((s) => ({ ...s, username: (e.target as HTMLInputElement).value }))
        }
        class="w-full border rounded px-3 py-2"
      />

      <input
        type="email"
        placeholder="Correo electrónico"
        value={form.email}
        onInput={(e) =>
          setForm((s) => ({ ...s, email: (e.target as HTMLInputElement).value }))
        }
        class="w-full border rounded px-3 py-2"
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={form.password}
        onInput={(e) =>
          setForm((s) => ({ ...s, password: (e.target as HTMLInputElement).value }))
        }
        class="w-full border rounded px-3 py-2"
      />

      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={form.confirm}
        onInput={(e) =>
          setForm((s) => ({ ...s, confirm: (e.target as HTMLInputElement).value }))
        }
        class="w-full border rounded px-3 py-2"
      />
      <a href="/auth/login" class="text-sm text-blue-600 hover:underline">
        ¿Ya tienes cuenta? Inicia sesión
      </a>
      <button
        type="submit"
        disabled={loading}
        class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Creando cuenta..." : "Registrarse"}
      </button>
    </form>
  );
}
