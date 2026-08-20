import { z } from "zod";

export const CrearEstudianteSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es obligatorio" }),
  apellidoPaterno: z.string().min(1, { message: "El apellido paterno es obligatorio" }),
  apellidoMaterno: z.string().min(1, { message: "El apellido materno es obligatorio" }),
  numeroDocumento: z.string().min(1, { message: "El número de documento es obligatorio" }),
  correo: z.string().email({ message: "El email no es válido" })
});

export type CrearEstudianteSchemaType = z.infer<typeof CrearEstudianteSchema>;

export const EstudianteSchema = z.object({
  id: z.string(),
  username: z.string(),
  correo: z.string().email(),
  estado: z.string(),
});

export type EstudianteType = z.infer<typeof EstudianteSchema>;

export const EstudianteFormSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  apellidoPaterno: z.string(),
  apellidoMaterno: z.string(),
  numeroDocumento: z.string(),
  correo: z.string().email(),
});

export type EstudianteFormType = z.infer<typeof EstudianteFormSchema>;