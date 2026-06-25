import { defineField, defineType } from "sanity";

export const resourceStandardType = defineType({
  name: "resourceStandard",
  title: "Resources - Standards & Guidelines",
  type: "document",
  groups: [{ name: "content", title: "Content", default: true }],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      group: "content",
      description: "Use internal paths or full https URLs.",
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      group: "content",
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
