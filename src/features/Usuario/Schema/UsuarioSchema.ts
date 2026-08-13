import z from "zod"
import { createPaginatedResponseSchema } from "@/utils/Schema/Response";

export const UsuarioIndexSchema = z.object({
    id: z.string(),
    username: z.string(),
    correo: z.string().email(),
    estado: z.string(),
    correoVerificadoEn: z.string().nullable(),
    updatedAt: z.string(),
});

export type UsuarioIndexType = z.infer<typeof UsuarioIndexSchema>;
export const UserIndexResponseSchema = createPaginatedResponseSchema(UsuarioIndexSchema);

export type UserIndexResponseType = z.infer<typeof UserIndexResponseSchema>;


export const UserCreateSchema = UsuarioIndexSchema
    .omit({
        id_usuario: true,
        estado: true,
        created_at: true,
        updated_at: true
    })
    .extend({
        rol: z.enum(["administrador", "estudiante", "docente"], {
            message: "Selecciona un rol válido"
        })
    });

export type UserCreateType = z.infer<typeof UserCreateSchema>;


export const UserUpdateSchema = UserCreateSchema.partial();

export type UserUpdateType = z.infer<typeof UserUpdateSchema>;
