import { defineField, defineType } from "sanity";

export const resourcePublicationType = defineType({
  name: "resourcePublication",
  title: "Resources - Research & Publications",
  type: "document",
  groups: [{ name: "content", title: "Content", default: true }],
  fields: [
    defineField({
      name: "type",
      title: "Publication type",
      type: "string",
      group: "content",
      options: {
        list: ["Research Paper", "Case Study", "White Paper", "Technical Report"],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "theme",
      title: "Badge theme",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Navy", value: "navy" },
          { title: "Purple", value: "purple" },
          { title: "Teal", value: "teal" },
          { title: "Orange", value: "orange" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(180),
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(180),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(10),
    }),
    defineField({
      name: "href",
      title: "Read link",
      type: "string",
      group: "content",
      description: "Use internal paths, file URLs, or full https URLs.",
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "buttonLabel",
      title: "Button label",
      type: "string",
      group: "content",
      initialValue: "Read PDF",
      validation: (rule) => rule.required().max(40),
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
      subtitle: "type",
    },
  },
});
