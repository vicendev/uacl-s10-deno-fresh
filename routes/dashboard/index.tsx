import { Handlers, PageProps } from "$fresh/server.ts";
import Table from "../../islands/Table.tsx";
import { Book } from "../../types/book.ts";

export const handler: Handlers<Book[]> = {
  async GET(req, ctx) {
    const baseUrl = `${new URL(req.url).origin}`;
    const res = await fetch(`${baseUrl}/api/books`);
    if (!res.ok) {
      return ctx.render([]);
    }
    const books: Book[] = await res.json();
    return ctx.render(books);
  },
};

export default function Dashboard ({ data }: PageProps<Book[]>) {
  

  return (
    <div class="flex flex-col px-4 py-8 mx-auto bg-slate-200 h-screen">
      <Table data={data} />
    </div>
  )
}