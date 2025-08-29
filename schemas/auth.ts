// schemas/auth.ts
import { z } from "zod";

/**
 * Schemas y tipos relacionados con la autenticación
 */
export const LoginSchema = z.object({
  username: z.string().min(3).max(50).regex(/^\S+$/, "Sin espacios"),
  password: z.string().min(6).max(128),
});
export type LoginInput = z.infer<typeof LoginSchema>;

/**
 * Schema y tipo para el registro de usuarios
 */
export const RegisterSchema = z.object({
  username: z.string().min(3).max(50).regex(/^\S+$/),
  email: z.string().email().max(100),
  password: z.string().min(8).max(128),
  confirm: z.string(),
}).refine(d => d.password === d.confirm, {
  path: ["confirm"],
  message: "Las contraseñas no coinciden",
});
export type RegisterInput = z.infer<typeof RegisterSchema>;

/**
 * Schema y tipo para el usuario autenticado
 */
export const UserSchema = z.object({
  id: z.number().int().positive(),
  username: z.string(),
  roles: z.array(z.string()).optional(),
});
export type User = z.infer<typeof UserSchema>;
