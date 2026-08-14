// Schema/ModuloSchema.ts
import z from "zod";
import { createPaginatedResponseSchema } from "@/utils/Schema/Response";

export const ModuloSchema = z.object({
    id: z.string(),
    cursoId: z.string(),
    nombre: z.string(),
    descripcion: z.string().nullable(),
    fraseMotivacional: z.string().nullable(),
    rutaImagen: z.string().nullable(),
    orden: z.number(),
    otorgaCertificacion: z.boolean(),
    estaPublicado: z.boolean(),
    creadoEn: z.string(),
    actualizadoEn: z.string(),
});

export type ModuloType = z.infer<typeof ModuloSchema>;

// Curso resumido, tal como lo incluye el backend en los includes
const CursoResumenSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    categoria: z.string().nullable(),
});

// GET /modulos -> incluye curso resumido
export const ModuloListItemSchema = ModuloSchema.extend({
    curso: CursoResumenSchema,
});
export type ModuloListItemType = z.infer<typeof ModuloListItemSchema>;

export const ModulosResponseSchema = createPaginatedResponseSchema(ModuloListItemSchema);
export type ModulosResponseType = z.infer<typeof ModulosResponseSchema>;

// GET /modulos/curso/:cursoId -> sin curso anidado (ya sabes en cuál estás)
export const ModulosCursoResponseSchema = createPaginatedResponseSchema(ModuloSchema);
export type ModulosCursoResponseType = z.infer<typeof ModulosCursoResponseSchema>;

// GET /modulos/:id -> detalle con curso + contadores
export const ModuloDetailResponseSchema = ModuloSchema.extend({
    curso: CursoResumenSchema,
    _count: z.object({
        lecciones: z.number(),
        inscripciones: z.number(),
    }),
});
export type ModuloDetailType = z.infer<typeof ModuloDetailResponseSchema>;

// Body para crear/editar
export const ModuloCreateSchema = z.object({
    cursoId: z.string().min(1, "El curso es obligatorio"),
    nombre: z.string().min(1, "El nombre es obligatorio"),
    descripcion: z.string().optional(),
    fraseMotivacional: z.string().optional(),
    rutaImagen: z.string().optional(),
    orden: z.number().int().min(0, "El orden no puede ser negativo").optional(),
    otorgaCertificacion: z.boolean().optional(),
    estaPublicado: z.boolean().optional(),
});
export type ModuloCreateType = z.infer<typeof ModuloCreateSchema>;

export const ModuloUpdateSchema = ModuloCreateSchema.partial();
export type ModuloUpdateType = z.infer<typeof ModuloUpdateSchema>;