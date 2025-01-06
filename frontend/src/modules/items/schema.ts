import { z } from "zod";

export const itemFormSchema = z.object({
  name: z.string().min(1).max(100),
  description: z
    .string()
    .nullable()
    .refine((value) => (value ?? "").length <= 500, {
      message: "Description must be less than 500 characters",
    }),
  price: z.coerce.number().gte(0.01),
});
