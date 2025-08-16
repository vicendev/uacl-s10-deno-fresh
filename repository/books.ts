import sql from "../helpers/db.ts";
import { Book } from "../types/book.ts";


export async function getBooks() {
  const response = await sql`
    SELECT id, title, publication_year, stock, price, created_at, updated_at FROM books ORDER BY id ASC
  ` as Book[]; 
  
  return response;
}

export async function updateBook(book: Book) {
  const response = await sql`
    UPDATE books
    SET title = ${book.title}, publication_year = ${book.publication_year}, stock = ${book.stock}, price = ${book.price}
    WHERE id = ${book.id}
  `;

  return response;
}

export async function createBook(book: Book) {
  const response = await sql`
    INSERT INTO books (title, publication_year, stock, price)
    VALUES (${book.title}, ${book.publication_year}, ${book.stock}, ${book.price})
    RETURNING id, title, publication_year, stock, price, created_at, updated_at
  ` as Book[];

  return response[0];
}

export async function deleteBook(id: number) {
  const response = await sql`
    DELETE FROM books WHERE id = ${id}
  `;

  return response;
}