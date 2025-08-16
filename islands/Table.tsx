import { useEffect, useMemo, useState } from "preact/hooks";
import Modal from "./Modal.tsx";
import { Book } from "../types/book.ts";
import { modalStore, useModal } from "../stores/modal.ts";
import BookForm from "./BookForm.tsx";
import { getVisiblePageRange } from "../helpers/pagination.ts";
import { bookStore } from "../stores/books.ts";

export default function Table({ data }: { data: Book[] }) {
  const openEdit = (book: Book) => modalStore.getState().openWith(book);
  const closeModal = () => modalStore.getState().close();
  const _modalDetails = (restMethod: string, modalTitle: string) => modalStore.getState().setModalDetails(restMethod, modalTitle);

  const { modalTitle, restMethod } = useModal();
  const [books, setBooks] = useState<Book[]>(bookStore.getState().books);

  useEffect(() => {
    const unsub = bookStore.subscribe((state) => setBooks(state.books));
    bookStore.getState().reloadBooks();
    return () => unsub();
  }, []);

  // paginación
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 8,
    totalItems: data.length,
    totalPages: Math.ceil(data.length / 8),
    startIndex: 0,
    endIndex: 8,
  });

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      totalItems: books.length,
      totalPages: Math.ceil(books.length / prev.itemsPerPage),
    }));
  }, [books]);

  const updatePagination = (page: number) => {
    const startIndex = (page - 1) * pagination.itemsPerPage;
    const endIndex = Math.min(
      startIndex + pagination.itemsPerPage,
      pagination.totalItems,
    );
    setPagination({
      ...pagination,
      currentPage: page,
      startIndex,
      endIndex,
    });
  };

  const paginatedData = useMemo(() => {
    return books.slice(pagination.startIndex, pagination.endIndex);
  }, [books, pagination.startIndex, pagination.endIndex]);

  return (
    <>
    <div class="overflow-hidden">
      <div class="flex items-center justify-end p-4">
        <button
          class="p-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => {
            _modalDetails("POST", "Agregar libro");
            modalStore.getState().openWith({
              id: 1,
              title: "",
              publication_year: 0,
              stock: 0,
              price: 0
            } as Book);
          }}
        >
          + Agregar libro
        </button>
      </div>
    </div>
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div class="overflow-x-auto">
        <table class="table-fixed w-full divide-y divide-gray-200">
          <thead class="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th class="w-1/5 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Título
              </th>
              <th class="w-1/8 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Año
              </th>
              <th class="w-1/5 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Stock
              </th>
              <th class="w-1/8 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Precio
              </th>
              <th class="w-[140px] px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-100 bg-white">
            {paginatedData.map((book) => (
              <tr class="hover:bg-gray-50 align-middle">
                <td class="px-6 py-4 text-sm font-medium text-gray-900">
                  <div class="truncate max-w-[28rem]" title={book.title}>
                    {book.title}
                  </div>
                </td>

                <td class="px-6 py-4 text-sm text-gray-700 text-right tabular-nums whitespace-nowrap">
                  {book.publication_year}
                </td>

                <td class="px-6 py-4 text-sm">
                  {book.stock > 0 ? (
                    <span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 whitespace-nowrap">
                      {book.stock} en stock
                    </span>
                  ) : (
                    <span class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 whitespace-nowrap">
                      Sin stock
                    </span>
                  )}
                </td>

                <td class="px-6 py-4 text-sm text-gray-700 text-right tabular-nums whitespace-nowrap">
                  {new Intl.NumberFormat('es-PA', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(book.price)}
                </td>

                <td class="px-6 py-4 text-right text-sm whitespace-nowrap">
                  <a
                    onClick={() => {
                      _modalDetails("PUT", "Editar libro");
                      openEdit(book);
                    }}
                    class="text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    Editar
                  </a>
                  <span class="mx-2 text-gray-300">|</span>
                  <button
                    type="button"
                    class="text-red-600 hover:text-red-800"
                    onClick={() => {
                      if (!confirm(`¿Está seguro de eliminar el libro "${book.title}"?`)) {
                        return;
                      }

                      fetch(`/api/books?id=${book.id}`, {
                        method: "DELETE",
                      }).then((response) => {
                        if (!response.ok) {
                          alert("Error al eliminar el libro");
                          return;
                        }
                        bookStore.getState().reloadBooks();
                      });
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {books.length === 0 && (
              <tr>
                <td colSpan={5} class="px-6 py-10 text-center text-sm text-gray-500">
                  No hay resultados.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot class="bg-white">
            <tr>
              <td colSpan={5} class="px-6 py-4">
                <div class="flex items-center justify-between">
                  
                  {/* Info de resultados */}
                  <div class="text-sm text-gray-500">
                    Mostrando {pagination.startIndex + 1} a{" "}
                    {Math.min(pagination.endIndex, pagination.totalItems)} de{" "}
                    {pagination.totalItems} resultados.
                  </div>

                  {/* Paginación */}
                  <nav class="inline-flex items-center gap-2">
                    <button
                      type="button"
                      class={`px-3 py-2 border border-gray-300 rounded-md ${
                        pagination.currentPage === 1
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => updatePagination(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                    >
                      Atrás
                    </button>

                    {getVisiblePageRange(
                      pagination.currentPage,
                      pagination.totalPages
                    ).map((page, idx) =>
                      page === -1 ? (
                        <span key={`dots-${idx}`} class="px-2 select-none">
                          …
                        </span>
                      ) : (
                        <button
                          key={page}
                          type="button"
                          class={`px-3 py-2 border border-gray-300 rounded-md ${
                            pagination.currentPage === page
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => updatePagination(typeof page === "number" ? page : pagination.currentPage)}
                        >
                          {page}
                        </button>
                      )
                    )}
                    <button
                      type="button"
                      class={`px-3 py-2 border border-gray-300 rounded-md ${
                        pagination.currentPage === pagination.totalPages
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => updatePagination(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.totalPages}
                    >
                      Adelante
                    </button>
                  </nav>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <Modal<Book> title={modalTitle}>
        {({ data, close }) => (
          <BookForm
            initial={data}
            onCancel={close}
            onSave={async (updated) => {
              const response = await fetch("/api/books", {
                method: restMethod,
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updated),
              });
              if (!response.ok) {
                alert("Error al actualizar el libro");
                return;
              }
              
              modalStore.getState().close();
              await bookStore.getState().reloadBooks();
              closeModal();
            }}
          />
        )}
      </Modal>
    </div>
    </>
  );
}
