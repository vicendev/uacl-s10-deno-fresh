import useAuth from "../hooks/useAuth.ts";

/**
 * Componente de cabecera con navegación y funcionalidad de logout
 * @returns 
 */
export function Header() {

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();

    globalThis.window.location.href = "/auth/login";
  } 

  return (
    <header class="flex items-center justify-between px-4 py-2 bg-blue-500 text-white">
      <h1 class="text-xl font-bold">UACL Semana 10</h1>
      <nav>
        <ul class="flex space-x-4">
          <li><a href="/dashboard" class="hover:underline">Dashboard</a></li>
          <li>
            <button type="button" onClick={() => handleLogout()}>Logout</button></li>
        </ul>
      </nav>
    </header>
  );
}
