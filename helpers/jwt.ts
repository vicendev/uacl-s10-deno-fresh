import { decode } from "@gz/jwt";
import { User } from "../schemas/auth.ts";

/**
 * Función para decodificar un token JWT y obtener su payload
 * @param token JWT token to decode
 * @returns 
 */
export async function getTokenPayload(token: string) {
  const payload = await decode(token, Deno.env.get("JWT_SECRET")!) as User;

  return payload;
}

/**
 * Función para extraer el token JWT de la cabecera de cookies de una petición
 * @param req 
 * @returns 
 */
export function getTokenFromRequest(req: Request): string | null {
  const token = req.headers.get("cookie")?.match(/(?:^|;\s*)auth=([^;]+)/)?.[1] ?? null;

  return token;
}