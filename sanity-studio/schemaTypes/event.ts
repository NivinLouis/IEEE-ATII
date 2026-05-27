import { defineArrayMember, defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "News and Events - Events List",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "registration", title: "Registration" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "category" }],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "content",
      description: "Use this for venue name or values like Online.",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "displayTime",
      title: "Display time",
      type: "string",
      group: "content",
      description: "Example: 9:00 AM - 6:00 PM",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "startsAt",
      title: "Starts at",
      type: "datetime",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 4,
      group: "content",
      validation: (rule) => rule.max(400),
    }),
    defineField({
      name: "featured",
      title: "Featured event",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "registrationUrl",
      title: "Registration URL",
      type: "url",
      group: "registration",
      validation: (rule) => rule.uri({ allowRelative: true }),
    }),
    defineField({
      name: "registrationLabel",
      title: "Registration button label",
      type: "string",
      group: "registration",
      initialValue: "Register",
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      group: "seo",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (rule) => rule.max(160),
    }),
  ],
  orderings: [
    {
      title: "Start date, earliest first",
      name: "startsAsc",
      by: [{ field: "startsAt", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "startsAt",
    },
    prepare(selection) {
      const subtitle = selection.subtitle
        ? new Date(String(selection.subtitle)).toLocaleDateString("en-IN")
        : "Unscheduled";
      return {
        title: selection.title,
        subtitle,
      };
    },
  },
});
