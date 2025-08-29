import { Handlers } from "$fresh/server.ts";
import { responseJson } from "../../helpers/fetch.ts";
import { createBook, deleteBook, getBooks, updateBook } from "../../repository/books.ts";
import { Book } from "../../schemas/book.ts";

/**
 * Manejador para la ruta /api/books
 */
export const handler: Handlers = {
  async GET(_req) {
    const response = await getBooks();

    return responseJson(response, 200)
  },

  async PUT(_req) {
    const body = await _req.json() as Book;

    if (!body || !body.id) {
      return responseJson({ error: "Invalid book data" }, 400);
    }

    const response = await updateBook(body);

    return responseJson(response, 200);
  },

  async POST(_req) {
    const body = await _req.json() as Book;

    if (!body || !body.title || !body.publication_year || !body.stock || !body.price) {
      return responseJson({ error: "Invalid book data" }, 400);
    }

    const response = await createBook(body);
    
    return responseJson(response, 201);
  },

  async DELETE(_req) {
    const url = new URL(_req.url);
    const idParam = url.searchParams.get("id");
    const id = idParam ? parseInt(idParam, 10) : NaN;

    if (isNaN(id)) {
      return responseJson({ error: "Invalid or missing book ID" }, 400);
    }

    await deleteBook(id);

    return new Response(null, { status: 204 });
  }
};