import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "News Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(240),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});
