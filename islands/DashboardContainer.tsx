import { useEffect } from "preact/hooks";
import { useBooks } from "../hooks/useBooks.ts";
import BooksTable from "./books/BooksTable.tsx";
import { bookStore } from "../stores/bookStore.ts";

/**
 * Contenedor del Dashboard que muestra la tabla de libros
 * @returns Dashboard container component
 */
export const DashboardContainer = () => {

  const { getBooks } = useBooks();

  useEffect(() => {
    const fetchBooks = async () => {
      const booksList = await getBooks();
      bookStore.setState({ books: booksList });
    }
    fetchBooks();
  }, [getBooks, bookStore]);

  return (
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
      <BooksTable />
    </div>
  )
}