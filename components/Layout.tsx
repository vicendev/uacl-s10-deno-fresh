// components/Layout.tsx
import { JSX } from "preact/jsx-runtime";
import { Header } from "./Header.tsx";

export default function Layout(props: { children: JSX.Element }) {
  return (
    <div class="w-auto">
      <Header />
      <main class="h-screen">{props.children}</main>

      <footer style="margin-top:2rem;border-top:1px solid #eee;padding:1rem 0">
        <small>© {new Date().getFullYear()} Mi App</small>
      </footer>
    </div>
  );
}
