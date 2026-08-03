import z from "zod";

export const ResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
});

export type ResponseType = z.infer<typeof ResponseSchema>;