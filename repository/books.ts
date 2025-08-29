import sql from "../helpers/db.ts";
import { Book } from "../schemas/Book.ts";

/**
 * Query para obtener todos los libros
 * @returns Book[]
 */
export async function getBooks() {
  const response = await sql`
    SELECT id, title, publication_year, stock, price, created_at, updated_at FROM books ORDER BY id ASC
  ` as Book[]; 
  
  return response;
}

/**
 * Query para actualizar un libro
 * @param book Libro a actualizar
 * @returns 
 */
export async function updateBook(book: Book) {

  if (!book.id) {
    throw new Error("Book ID is required for update");
  }

  const response = await sql`
    UPDATE books
    SET title = ${book.title}, publication_year = ${book.publication_year}, stock = ${book.stock}, price = ${book.price}
    WHERE id = ${book.id}
  `;

  return response;
}

/**
 * Query para crear un nuevo libro
 * @param book Libro a crear
 * @returns 
 */
export async function createBook(book: Book) {
  const response = await sql`
    INSERT INTO books (title, publication_year, stock, price)
    VALUES (${book.title}, ${book.publication_year}, ${book.stock}, ${book.price})
    RETURNING id, title, publication_year, stock, price, created_at, updated_at
  ` as Book[];

  return response[0];
}

/**
 * Query para eliminar un libro
 * @param id Id del libro a eliminar
 * @returns 
 */
export async function deleteBook(id: number) {
  const response = await sql`
    DELETE FROM books WHERE id = ${id}
  `;

  return response;
}