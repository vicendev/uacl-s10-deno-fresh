import { Handlers } from "$fresh/server.ts";
import { responseJson } from "../../../helpers/fetch.ts";

/**
 * Manejador para la ruta /api/auth/logout
 */
export const handler: Handlers = {
  POST(_req) {
    const headers = new Headers();

    headers.set(
      "Set-Cookie",
      "auth=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0",
    );

    return responseJson({ ok: true }, 303, headers);
  },
};
