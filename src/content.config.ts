import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  category: z.string().default("Tipps"),
  cover: z.string().optional(),
  draft: z.boolean().default(false),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: blogSchema,
});

const blog_en = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog_en" }),
  schema: blogSchema,
});

export const collections = { blog, blog_en };
