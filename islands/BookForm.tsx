import { Book, BookSchema } from "../types/book.ts";

export default function BookForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Book;                 // ← para editar: pásalo completo
  onSave: (data: Book) => void;  // Book validado
  onCancel: () => void;
}) {
  const submit = (e: Event) => {
    e.preventDefault();
    const formEl = e.currentTarget as HTMLFormElement;
    const raw = Object.fromEntries(new FormData(formEl).entries());

    const res = BookSchema.safeParse(raw);
    if (!res.success) {
      alert(res.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('\n'));
      return;
    }
    onSave(res.data);
  };

  return (
    <form class="space-y-4" onSubmit={submit}>
      {/* id/fechas ocultos para conservarlos */}
      <input type="hidden" name="id" defaultValue={String(initial.id)} />
      <input type="hidden" name="created_at" defaultValue={initial.created_at ? new Date(initial.created_at).toDateString() : new Date().toISOString()} />
      <input type="hidden" name="updated_at" defaultValue={new Date().toISOString()} />

      <div>
        <label class="block text-sm font-medium text-gray-700">Título</label>
        <input
          name="title"
          class="w-full rounded border px-3 py-2"
          placeholder="Ej: Clean Code"
          defaultValue={initial.title}
          required
        />
      </div>

      <div class="grid grid-cols-3 gap-3">
        <div>
          <label class="block text-sm font-medium text-gray-700">Año</label>
          <input
            type="number"
            name="publication_year"
            class="w-full rounded border px-3 py-2"
            defaultValue={String(initial.publication_year)}
            min={0}
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            class="w-full rounded border px-3 py-2"
            defaultValue={String(initial.stock)}
            min={0}
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Precio</label>
          <input
            type="number"
            step="0.01"
            name="price"
            class="w-full rounded border px-3 py-2"
            defaultValue={String(initial.price)}
            min={0}
          />
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <button type="button" onClick={onCancel} class="rounded border px-4 py-2">
          Cancelar
        </button>
        <button type="submit" class="rounded bg-blue-600 px-4 py-2 text-white">
          Guardar
        </button>
      </div>
    </form>
  );
}
