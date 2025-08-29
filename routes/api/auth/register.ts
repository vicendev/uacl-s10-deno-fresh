import { Handlers } from "$fresh/server.ts";
import { sha256Hex } from "../../../helpers/crypto.ts";
import { responseJson } from "../../../helpers/fetch.ts";

import { authRegister } from "../../../repository/auth.ts";
import { RegisterInput } from "../../../schemas/auth.ts";

/**
 * Manejador para la ruta /api/auth/register
 */
export const handler: Handlers = {
  async POST(_req) {
    const body = await _req.json() as RegisterInput;
    if (!body.username || !body.password || !body.email) {
      return responseJson({ error: "Invalid registration data" }, 400);
    }

    const hash = await sha256Hex(body.password);

    const response = await authRegister({ username: body.username, password: hash, email: body.email });

    return responseJson(response, 200)
  }
}