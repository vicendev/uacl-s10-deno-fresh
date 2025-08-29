
/**
 * Función para hacer fetch a una URL y parsear la respuesta como JSON.
 * @param url 
 * @param init 
 * @returns 
 */
export async function fetchJSON<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    credentials: "same-origin", // importante: enviar cookies
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (data as any)?.error ?? (data as any)?.message ?? "Request failed";
    throw new Error(msg);
  }
  return data as T;
}

/**
 * Función para crear una respuesta JSON con el cuerpo, estado y cabeceras especificadas.
 * @param body 
 * @param status 
 * @param headers 
 * @returns 
 */
export function responseJson(body: unknown, status = 20, headers: Headers = new Headers()) {

  if (headers.keys().toArray().length === 0) {
    headers.append("Content-Type", "application/json"); 
  }

  return new Response(JSON.stringify(body), {
    status,
    headers: headers,
  });
}