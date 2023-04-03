import { z } from "zod";

const ImageMetadataSchema = z.object({
  src: z.string(),
  width: z.number(),
  height: z.number(),
  format: z.union([z.literal("png"), z.literal("jpg")]),
});

export const BlogImageSchema = z.object({
  src: z.union([
    ImageMetadataSchema,
    z.promise(z.object({ default: ImageMetadataSchema })),
  ]),
  width: z.number(),
  alt: z.string().optional(),
  caption: z.string().optional(),
});

export type BlogImageSchemaType = z.infer<typeof BlogImageSchema>;
