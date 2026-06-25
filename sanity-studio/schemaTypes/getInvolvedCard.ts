import { defineField, defineType } from "sanity";

export const getInvolvedCardType = defineType({
  name: "getInvolvedCard",
  title: "Get Involved - Cards",
  type: "document",
  groups: [{ name: "content", title: "Content", default: true }],
  fields: [
    defineField({
      name: "id",
      title: "Anchor id",
      type: "string",
      group: "content",
      description: "Used for section links such as /get-involved#anchor-id",
      validation: (rule) =>
        rule.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
          name: "kebab-case",
        }),
    }),
    defineField({
      name: "kind",
      title: "Card type",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Volunteer Opportunities - Teal", value: "volunteer" },
          { title: "Become a Member - Purple", value: "member" },
          { title: "Partner With Us - Orange", value: "partner" },
          { title: "Join Us - Navy", value: "join" },
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
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      group: "content",
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "buttonLabel",
      title: "Button label",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "buttonHref",
      title: "Button redirect link",
      type: "string",
      group: "content",
      description: "Use internal paths like /contact or anchors like /get-involved#volunteer, or a full https URL.",
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
      subtitle: "kind",
    },
  },
});
