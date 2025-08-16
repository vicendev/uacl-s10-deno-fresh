import { JSX } from "preact";

export function Header(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <header class="flex items-center justify-between px-4 py-2 bg-blue-500 text-white">
      <h1 class="text-xl font-bold">UACL Semana 10</h1>
      <nav>
        <ul class="flex space-x-4">
          <li><a href="/dashboard" class="hover:underline">Dashboard</a></li>
        </ul>
      </nav>
    </header>
  );
}
