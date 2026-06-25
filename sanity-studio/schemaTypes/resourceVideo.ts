import { defineField, defineType } from "sanity";

export const resourceVideoType = defineType({
  name: "resourceVideo",
  title: "Resources - Videos & Webinars",
  type: "document",
  groups: [{ name: "content", title: "Content", default: true }],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      group: "content",
      description: "Example: 48:12 or 1:12:34",
      validation: (rule) => rule.required().max(20),
    }),
    defineField({
      name: "type",
      title: "Video type",
      type: "string",
      group: "content",
      options: {
        list: ["Webinar", "Workshop", "Event"],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Video link",
      type: "string",
      group: "content",
      description: "Use internal paths or full https URLs.",
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (rule) => rule.required().max(180),
        }),
      ],
      validation: (rule) => rule.required(),
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
      media: "thumbnail",
    },
  },
});
