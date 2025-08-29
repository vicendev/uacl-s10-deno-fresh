import { FreshContext } from "$fresh/server.ts";
import { decode } from "@gz/jwt";
import { User } from "../schemas/auth.ts";
import { PUBLIC_PATHS, PUBLIC_API_PATHS, WRITER_REST_METHODS, READER_REST_METHODS } from "../constants/paths.ts";

/**
 * Funcion para verificar si una ruta es pública
 * @param pathname Ruta a verificar
 * @returns 
 */
function isPublic(pathname: string): boolean {
  if (PUBLIC_PATHS.has(pathname)) return true;
  if (PUBLIC_API_PATHS.has(pathname)) return true;

  return false;
}

/**
 * Funcion para verificar si un usuario tiene permisos según su rol
 * @param method HTTP method
 * @param token JWT token
 * @returns Promesa booleana indicando si el usuario tiene permisos
 */
async function hasUserPermissions(method: string, token: string): Promise<boolean> {
  const payload = await decode(token, Deno.env.get("JWT_SECRET")!) as User;

  if (!payload || !payload.roles) return false;

  for (const role of payload.roles) {
    if (role.includes("admin")) {
      return true;
    }

    if (role.includes("reader")) {

      return READER_REST_METHODS.has(method);
    }

    if (role.includes("writer")) {
      return READER_REST_METHODS.has(method) || WRITER_REST_METHODS.has(method);
    }
  }

  return false;
}

/**
 * Middleware para proteger rutas y verificar permisos
 * @param req Request
 * @param ctx FreshContext
 * @returns
 */
export async function handler(
  req: Request,
  ctx: FreshContext,
) {
  
  if (ctx.destination != "route") { 
    return ctx.next();
  }

  const { pathname } = new URL(req.url);
  
  if (isPublic(pathname)) {
    return ctx.next();
  }

  const isAPI = pathname.startsWith("/api/");
  const token = req.headers.get("cookie")?.match(/(?:^|;\s*)auth=([^;]+)/)?.[1];

  if (!token) {
    return isAPI
      ? Response.json({ error: "Unauthorized" }, { status: 401 })
      : new Response(null, { status: 303, headers: { Location: "auth/login" } });
  }

  if (isAPI) {
    const hasPermissions = await hasUserPermissions(req.method, token);
    if (!hasPermissions) {
      return Response.json({ error: "Error 403 Forbidden: No tiene permisos" }, { status: 403 });
    }
  }
  

  return ctx.next();
}