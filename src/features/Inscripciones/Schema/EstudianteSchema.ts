import { z } from "zod";

export const CrearEstudianteSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es obligatorio" }),
  apellidoPaterno: z.string().min(1, { message: "El apellido paterno es obligatorio" }),
  apellidoMaterno: z.string().min(1, { message: "El apellido materno es obligatorio" }),
  email: z.string().email({ message: "El email no es válido" })
});

export type CrearEstudianteSchemaType = z.infer<typeof CrearEstudianteSchema>;