import { z } from "zod";

export const RolSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    descripcion: z.string().nullable(),
});

export type RolType = z.infer<typeof RolSchema>;

export const RolesResponseSchema = z.array(RolSchema);

export type RolesResponseType = z.infer<
    typeof RolesResponseSchema
>;