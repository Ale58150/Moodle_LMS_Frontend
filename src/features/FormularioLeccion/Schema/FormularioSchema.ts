// features/FormularioLeccion/Schema/FormularioSchema.ts
import z from "zod";

export const OpcionAdminSchema = z.object({
    id: z.string(),
    preguntaFormularioId: z.string(),
    texto: z.string(),
    esCorrecta: z.boolean(),
    orden: z.number(),
});
export type OpcionAdminType = z.infer<typeof OpcionAdminSchema>;

export const PreguntaAdminSchema = z.object({
    id: z.string(),
    formularioId: z.string(),
    enunciado: z.string(),
    tipoPregunta: z.string(),
    orden: z.number(),
    opciones: z.array(OpcionAdminSchema),
});
export type PreguntaAdminType = z.infer<typeof PreguntaAdminSchema>;

export const FormularioAdminSchema = z.object({
    id: z.string(),
    leccionId: z.string(),
    titulo: z.string(),
    estado: z.string(),
    preguntas: z.array(PreguntaAdminSchema),
});
export type FormularioAdminType = z.infer<typeof FormularioAdminSchema>;

// ---- Bodies ----

export const CreateOpcionSchema = z.object({
    texto: z.string().min(1, "El texto es obligatorio"),
    esCorrecta: z.boolean().optional(),
    orden: z.number().int().min(0).optional(),
});
export type CreateOpcionType = z.infer<typeof CreateOpcionSchema>;

export const CreatePreguntaSchema = z.object({
    enunciado: z.string().min(1, "El enunciado es obligatorio"),
    tipoPregunta: z.string().optional(),
    orden: z.number().int().min(0).optional(),
    opciones: z.array(CreateOpcionSchema).min(2, "Cada pregunta necesita al menos 2 opciones"),
});
export type CreatePreguntaType = z.infer<typeof CreatePreguntaSchema>;

export const CreateFormularioSchema = z.object({
    titulo: z.string().min(1, "El título es obligatorio"),
    preguntas: z.array(CreatePreguntaSchema).min(1, "El formulario necesita al menos 1 pregunta"),
});
export type CreateFormularioType = z.infer<typeof CreateFormularioSchema>;

export const UpdatePreguntaSchema = z.object({
    enunciado: z.string().optional(),
    tipoPregunta: z.string().optional(),
    orden: z.number().int().min(0).optional(),
});
export type UpdatePreguntaType = z.infer<typeof UpdatePreguntaSchema>;

export const UpdateOpcionSchema = CreateOpcionSchema.partial();
export type UpdateOpcionType = z.infer<typeof UpdateOpcionSchema>;