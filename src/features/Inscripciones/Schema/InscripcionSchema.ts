import { z } from "zod";

export const ModuloSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    orden: z.number(),
});

export type ModuloType = z.infer<typeof ModuloSchema>;

export const CursoSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    categoria: z.string().nullable(),
    modulos: z.array(ModuloSchema),
});

export type CursoType = z.infer<typeof CursoSchema>;

export const InscripcionIndexSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    apellidoPaterno: z.string(),
    apellidoMaterno: z.string(),
    correo: z.string().email(),
    cursos: z.array(CursoSchema),
    estadoAcceso: z.string(),
});

export type InscripcionIndexType = z.infer<typeof InscripcionIndexSchema>;

export const CrearInscripcionSchema = z.object({
    cursoId: z.string().min(1, { message: "El curso es obligatorio" }),
    moduloId: z.string().min(1, { message: "El módulo es obligatorio" }),
    estudianteIds: z.array(z.string()).min(1, { message: "Debe seleccionar al menos un estudiante" }),
    estadoAcceso: z.string()
});

export type CrearInscripcionSchemaType = z.infer<typeof CrearInscripcionSchema>;
