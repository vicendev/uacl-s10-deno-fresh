import { Handlers } from "$fresh/server.ts";
import { encode } from "@gz/jwt";

import { sha256Hex } from "../../../helpers/crypto.ts";
import { responseJson } from "../../../helpers/fetch.ts";

import { authLogin } from "../../../repository/auth.ts";
import { LoginInput, User } from "../../../schemas/auth.ts";
import { getRole } from "../../../repository/role.ts";

/**
 * Manejador para la ruta /api/auth/login
 */
export const handler: Handlers = {
  async POST(_req) {
    const body = await _req.json() as LoginInput;

    const password = body.password ?? "";
    const hash = await sha256Hex(password);


    const response = await authLogin({ username: body.username, password: hash });

    if (!response) {
      return responseJson({ result: false, error: "Invalid credentials" }, 401);
    }

    const responseGetRole = await getRole(response.id);

    if (!responseGetRole) {
      return responseJson({ result: false, error: "User has no role assigned" }, 403);
    }

    const headers = new Headers();
    
    const payload: User = { 
      id: response.id, 
      username: response.username, 
      roles: responseGetRole 
    };

    const jwt = await encode(payload, Deno.env.get("JWT_SECRET")!, { algorithm: "HS256" });

    headers.append("Content-Type", "application/json");
    headers.append("Set-Cookie", `auth=${jwt}; HttpOnly; Path=/; Max-Age=86400`);
    
    return responseJson({ result: true } , 200, headers);
  }
}