import z from "zod";

export const ResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
});

export type ResponseType = z.infer<typeof ResponseSchema>;

export function createPaginatedResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
    return z.object({
        success: z.boolean(),
        data: z.array(dataSchema),
        pagination: z.object({
            total: z.number(),
            per_page: z.number(),
            current_page: z.number(),
            last_page: z.number()
        })
    });
}