import { crypto } from "@std/crypto";

/**
 * Funcion que genera el hash SHA-256 en formato hexadecimal de una cadena de texto
 * @param input String a hashear
 * @returns 
 */
export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
