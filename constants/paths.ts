/**
 * Constante que define las rutas públicas que no requieren autenticación
 * @constant {Set<string>}
 */
export const PUBLIC_PATHS = new Set<string>([
  "/",
  "/auth/login",
  "/auth/register",
  "/favicon.ico",
]);

/**
 * Constante que define las rutas de la API pública que no requieren autenticación
 * @constant {Set<string>}
 */
export const PUBLIC_API_PATHS = new Set<string>([
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/logout",
]);

/**
 * Constante que define los métodos HTTP permitidos para usuarios con rol "reader"
 * @constant {Set<string>}
 */
export const READER_REST_METHODS = new Set<string>([
  "GET"
]);

/**
 * Constante que define los métodos HTTP permitidos para usuarios con rol "writer"
 * @constant {Set<string>}
 */
export const WRITER_REST_METHODS = new Set<string>([
  "POST",
  "PUT",
]);