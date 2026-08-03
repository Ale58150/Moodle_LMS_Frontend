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
        estado: z.string(),
    }),
    rol: z.string(),
    menu: z.array(
        z.object({
            nombre: z.string(),
            ruta: z.string()
        })
    )
});

export type LoginResponseType = z.infer<typeof LoginResponseSchema>;

export const ResetPasswordSchema = z
    .object({
        new_password: z.string(),
        confirm_password: z.string(),
    })
    .refine((data) => data.new_password === data.confirm_password, {
        message: "Las contraseñas no coinciden",
        path: ["confirm_password"],
    });

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

export const UserMeResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        id_usuario: z.number(),
        nombre: z.string(),
        apellido_paterno: z.string(),
        apellido_materno: z.string().nullable(),
        correo: z.string().email(),
        email_verified_at: z.string().nullable(),
        telefono: z.string().nullable(),
        tipo_documento_identidad: z.string().nullable(),
        numero_documento: z.string().nullable(),
        fecha_nacimiento: z.string().nullable(),
        genero: z.string().nullable(),
        ciudad: z.string().nullable(),
        pais: z.string().nullable(),
        ocupacion: z.string().nullable(),
        contacto_emergencia_nombre: z.string().nullable(),
        contacto_emergencia_telefono: z.string().nullable(),
        fotografia_ruta: z.string().nullable(),
        estado: z.string(),
        correo_verificado_en: z.string().nullable(),
        ultimo_acceso_en: z.string().nullable(),
        created_at: z.string(),
        updated_at: z.string()
    })
});

export type UserMeResponseType = z.infer<typeof UserMeResponseSchema>;
export type UserMeDataType = z.infer<typeof UserMeResponseSchema>["data"];
