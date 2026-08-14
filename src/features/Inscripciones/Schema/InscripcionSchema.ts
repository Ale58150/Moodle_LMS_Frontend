import { z } from "zod";

export const CrearInscripcionSchema = z.object({
    cursoId: z.string().min(1, { message: "El curso es obligatorio" }),
    moduloId: z.string().min(1, { message: "El módulo es obligatorio" }),
    estudianteId: z.string().min(1, { message: "El estudiante es obligatorio" }),
    estadoAcceso: z.string()
});

export type CrearInscripcionSchemaType = z.infer<typeof CrearInscripcionSchema>;
