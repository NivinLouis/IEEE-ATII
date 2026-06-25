import { defineField, defineType } from "sanity";

export const initiativeCardType = defineType({
  name: "initiativeCard",
  title: "Intiatives - Cards",
  type: "document",
  groups: [{ name: "content", title: "Content", default: true }],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "id",
      title: "Anchor id",
      type: "string",
      group: "content",
      description: "Used for section links such as /initiatives#anchor-id",
      validation: (rule) =>
        rule.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
          name: "kebab-case",
        }),
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Innovation - Navy", value: "innovation" },
          { title: "Education - Purple", value: "education" },
          { title: "Community - Teal", value: "community" },
          { title: "Campus - Orange", value: "campus" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "content",
      options: {
        list: ["Ongoing", "Upcoming", "Completed", "In Planning"],
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
      validation: (rule) => rule.required().max(360),
    }),
    defineField({
      name: "statOneValue",
      title: "Stat 1 number",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(20),
    }),
    defineField({
      name: "statOneLabel",
      title: "Stat 1 label",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(50),
    }),
    defineField({
      name: "statTwoValue",
      title: "Stat 2 number",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(20),
    }),
    defineField({
      name: "statTwoLabel",
      title: "Stat 2 label",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(50),
    }),
    defineField({
      name: "statThreeValue",
      title: "Stat 3 number",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(20),
    }),
    defineField({
      name: "statThreeLabel",
      title: "Stat 3 label",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(50),
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
      subtitle: "status",
    },
  },
});
