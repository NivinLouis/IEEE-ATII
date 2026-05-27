import { defineField, defineType } from "sanity";

export const resourceGuideType = defineType({
  name: "resourceGuide",
  title: "Resources - Guides & Toolkits",
  type: "document",
  groups: [{ name: "content", title: "Content", default: true }],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
      group: "content",
      options: {
        list: ["PDF", "DOCX", "PPT", "ZIP"],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      group: "content",
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Purple", value: "purple" },
          { title: "Teal", value: "teal" },
          { title: "Orange", value: "orange" },
          { title: "Navy", value: "navy" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Download link",
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
      initialValue: "Download",
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
      subtitle: "format",
    },
  },
});
