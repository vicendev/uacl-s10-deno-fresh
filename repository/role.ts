import sql from "../helpers/db.ts";

/**
 * Query para asignar un rol a un usuario
 * @param userId 
 * @param roleName 
 * @returns 
 */
export async function assignRoleToUser(userId: number, roleName: string) {
  const getRole = await sql`SELECT id FROM roles WHERE name = ${roleName}`;

  if (getRole.length === 0) {
    throw new Error("Role not found");
  }

  const roleId = getRole[0].id;
  const response = await sql`
    INSERT INTO users_roles (user_id, role_id)
    VALUES (${userId}, ${roleId})
    RETURNING user_id, role_id
  `;

  if (response.length === 0) {
    throw new Error("Error assigning role to user");
  }

  return response[0];
}

/**
 * Query para obtener los roles de un usuario
 * @param userId 
 * @returns 
 */
export async function getRole(userId: number) {
  const response = await sql`
    SELECT r.name FROM roles r
    JOIN users_roles ur ON ur.role_id = r.id
    WHERE ur.user_id = ${userId}
  `;

  return response.length === 0 ? null : response.map((r) => r.name);
}