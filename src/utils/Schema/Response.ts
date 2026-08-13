import z from "zod";

export const ResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
});

export type ResponseType = z.infer<typeof ResponseSchema>;

export function createPaginatedResponseSchema<
    T extends z.ZodTypeAny
>(dataSchema: T) {
    return z.object({
        data: z.array(dataSchema),
        meta: z.object({
            page: z.number(),
            limit: z.number(),
            total: z.number(),
            totalPages: z.number(),
        }),
    });
}