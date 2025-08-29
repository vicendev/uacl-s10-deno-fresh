import postgres from "https://deno.land/x/postgresjs@v3.4.7/mod.js";

/**
 * Conexión a la base de datos PostgreSQL usando la URL definida en las variables de entorno.
 */
const sql = postgres(Deno.env.get("DATABASE_URL") ?? "", {
  ssl: "require"
});

export default sql;