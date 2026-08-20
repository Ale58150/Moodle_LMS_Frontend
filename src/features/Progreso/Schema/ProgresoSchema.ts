import z from "zod";

export const ProgresoSchema = z.object({
    id: z.string(),
    inscripcionId: z.string(),
    modulo: z.object({
        id: z.string(),
        nombre: z.string(),
        cursoId: z.string(),
    }),
    estado: z.string(),
    porcentaje: z.number(),
    leccionesTotales: z.number(),
    leccionesCompletadas: z.number(),
    leccionesPendientes: z.number(),
    completadoEn: z.coerce.date().nullable(),
    actualizadoEn: z.coerce.date(),
});

export type Progreso = z.infer<typeof ProgresoSchema>;