import { Book } from "../schemas/Book.ts";

/**
 * Hook para manejar operaciones relacionadas con libros
 * @returns funciones para gestionar libros
 */
export const useBooks = () => {

  /**
   * Función asíncrona para obtener la lista de libros vía API
   * @returns Lista de libros
   */
  const getBooks = async () => {
    const res = await fetch("/api/books" , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  }

  /**
   * Función asíncrona para editar un libro vía API
   * @param book Libro a editar
   * @returns 
   */
  const editBook = async (book: Book) => {
    const res = await fetch("/api/books" , {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    return await res.json();
  }

  /**
   * Función asúncrona para guardar un libro vía API
   * @param book Libro a guardar
   * @returns 
   */
  const saveBook = async (book: Book) => {
    const res = await fetch("/api/books" , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    return await res.json();
  }

  /**
   * Función asúncrona para eliminar un libro vía API
   * @param id Id del libro a eliminar
   * @returns 
   */
  const deleteBook = async (id: number) => {
    const res = await fetch(`/api/books?id=${id}` , {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  }

  return {
    getBooks,
    editBook,
    saveBook,
    deleteBook
  }
}