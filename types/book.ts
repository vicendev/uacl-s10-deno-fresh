import { z } from "https://esm.sh/zod@3.23.8";

// esquema
export const BookSchema = z.object({
  id: z.coerce.number().int().positive().optional().or(z.nan()),
  title: z.string().min(1, "El título es obligatorio"),
  publication_year: z.coerce.number().int().min(0, "El año no puede ser negativo"),
  stock: z.coerce.number().int().min(0, "El stock no puede ser negativo"),
  price: z.coerce.number().nonnegative("El precio no puede ser negativo"),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

// tipo inferido desde el schema (idéntico a tu interface)
export type Book = z.infer<typeof BookSchema>;
