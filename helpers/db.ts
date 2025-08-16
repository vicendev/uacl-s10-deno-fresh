import postgres from "https://deno.land/x/postgresjs@v3.4.7/mod.js";

const sql = postgres(Deno.env.get("DATABASE_URL") ?? "", {
  ssl: "require"
});

export default sql;