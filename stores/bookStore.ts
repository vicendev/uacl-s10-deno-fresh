// stores/bookStore.ts
import { createStore } from "zustand/vanilla";
import { Book } from "../schemas/book.ts";

interface BookState {
  books: Book[];
  setBooks: (books: Book[]) => void;
  reloadBooks: () => Promise<void>;
}

/**
 * Store para manejar el estado de los libros
 */
export const bookStore = createStore<BookState>((set) => ({
  books: [],
  setBooks: (books) => set({ books }),
  reloadBooks: async () => {
    const res = await fetch("/api/books");
    const data = await res.json();
    set({ books: data });
  },
}));
