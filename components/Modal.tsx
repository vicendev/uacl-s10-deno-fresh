// Modal.tsx
import { ComponentChildren } from "preact";
import { useModal } from "../stores/modalStore.ts";


type ModalProps<T = unknown> = {
  title?: string;
  children?: ComponentChildren | ((ctx: { data: T; close: () => void }) => ComponentChildren);
};

/**
 * Componente Modal reutilizable
 * @param ModalProps<T>
 * @returns 
 */
export default function Modal<T = unknown>({ title, children }: ModalProps<T>) {
  const { open, data, close } = useModal<T>();

  if (!open || !data) return null;

  const content =
    typeof children === "function"
      ? (children as (ctx: { data: T; close: () => void }) => ComponentChildren)({ data, close })
      : children;

  return (
    <div
      class="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div class="w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div class="flex items-center justify-between border-b px-4 py-3">
          {title && <h2 class="text-lg font-semibold">{title}</h2>}
          <button onClick={close} class="p-1 rounded hover:bg-gray-100">✕</button>
        </div>
        <div class="px-4 py-5">{content}</div>
      </div>
    </div>
  );
}
