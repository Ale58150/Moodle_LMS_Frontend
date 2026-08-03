import { z } from "zod";

export const AuthSchema = z.object({
    correo: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export type AuthSchemaType = z.infer<typeof AuthSchema>;

export const LoginResponseSchema = z.object({
    token: z.string(),
    usuario: z.object({
        id_usuario: z.number(),
        nombre: z.string(),
        apellido_paterno: z.string(),
        correo: z.string().email(),
        estado: z.number(),
    }),
});

export type LoginResponseType = z.infer<typeof LoginResponseSchema>;