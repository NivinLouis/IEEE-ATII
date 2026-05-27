import { defineArrayMember, defineField, defineType } from "sanity";

export const projectsStoriesSectionType = defineType({
  name: "projectsStoriesSection",
  title: "Global - Stories of Change",
  type: "document",
  groups: [{ name: "content", title: "Content", default: true }],
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      group: "content",
      initialValue: "Projects Stories of Change",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "items",
      title: "Stories",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required().max(120),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required().max(360),
            }),
            defineField({
              name: "gradient",
              title: "Gradient theme",
              type: "string",
              options: {
                list: [
                  { title: "Teal to Navy", value: "from-teal via-teal to-navy" },
                  { title: "Purple to Navy", value: "from-purple via-purple to-navy" },
                  { title: "Orange to Purple", value: "from-orange via-orange to-purple" },
                ],
                layout: "dropdown",
              },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "gradient",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      return {
        title: selection.title || "Projects Stories of Change",
      };
    },
  },
});
