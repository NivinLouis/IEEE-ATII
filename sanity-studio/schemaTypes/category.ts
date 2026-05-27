import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "News and Events - Categories",
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
    defineField({
      name: "tagColor",
      title: "Tag color",
      type: "string",
      description: "Optional. Used by the frontend for badges and tags.",
      options: {
        list: [
          { title: "Orange", value: "orange" },
          { title: "Teal", value: "teal" },
          { title: "Navy", value: "navy" },
          { title: "Slate", value: "slate" },
          { title: "Gold", value: "gold" },
        ],
        layout: "dropdown",
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});
