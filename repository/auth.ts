import sql from "../helpers/db.ts";
import { LoginInput, RegisterInput, User } from "../schemas/auth.ts";
import { assignRoleToUser } from "./role.ts";

/**
 * Query para autenticar a un usuario
 * @param username 
 * @param password
 *  
 * @returns 
 */
export async function authLogin({username, password}: LoginInput) {
  const response = await sql`
    SELECT id, username FROM users WHERE username = ${username} AND password_hash = ${password}
  ` as User[];

  console.log(response)
  if (response.length === 0) {
    return null;
  }

  return response.length === 0 ? null : response[0];
}

/**
 * Query para registrar un nuevo usuario
 * @param username 
 * @param password
 * @param email
 * 
 * @returns 
 */
export async function authRegister({username, password, email}: Partial<RegisterInput>) {
  const response = await sql`
    INSERT INTO users (username, email, password_hash)
    VALUES (${username!}, ${email!}, ${password!})
    RETURNING id
  `;

  if (response.length === 0) {
    throw new Error("Error registering user");
  }

  assignRoleToUser(response[0].id, "reader");

  return response[0];
}