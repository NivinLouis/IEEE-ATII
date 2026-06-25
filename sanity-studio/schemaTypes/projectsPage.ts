import { defineArrayMember, defineField, defineType } from "sanity";

export const projectsPageType = defineType({
  name: "projectsPage",
  title: "Projects - Categories & Featured",
  type: "document",
  groups: [{ name: "content", title: "Content", default: true }],
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      group: "content",
      initialValue: "Projects Page",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "projectCategories",
      title: "Project categories",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "kind",
              title: "Category type",
              type: "string",
              options: {
                list: [
                  { title: "Assistive Devices - Navy", value: "assistiveDevices" },
                  { title: "Inclusive Education - Purple", value: "inclusiveEducation" },
                  { title: "Accessibility Tools - Teal", value: "accessibilityTools" },
                  { title: "Livelihood & Skills - Orange", value: "livelihoodSkills" },
                  { title: "Community Inclusion - Navy", value: "communityInclusion" },
                  { title: "Research & Innovation - Teal", value: "researchInnovation" },
                ],
                layout: "dropdown",
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required().max(120),
            }),
            defineField({
              name: "count",
              title: "Count",
              type: "string",
              validation: (rule) => rule.required().max(20),
            }),
            defineField({
              name: "sortOrder",
              title: "Sort order",
              type: "number",
              initialValue: 0,
              validation: (rule) => rule.required().integer().min(0),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "count",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "featuredProject",
      title: "Featured project",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (rule) => rule.required().max(140),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
          validation: (rule) => rule.required().max(500),
        }),
        defineField({
          name: "tags",
          title: "Tags",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
          validation: (rule) => rule.max(8),
        }),
        defineField({
          name: "metrics",
          title: "Metrics",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "value",
                  title: "Value",
                  type: "string",
                  validation: (rule) => rule.required().max(20),
                }),
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                  validation: (rule) => rule.required().max(40),
                }),
              ],
              preview: {
                select: {
                  title: "value",
                  subtitle: "label",
                },
              },
            }),
          ],
          validation: (rule) => rule.max(3),
        }),
        defineField({
          name: "outcomes",
          title: "Outcomes",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
          validation: (rule) => rule.max(8),
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
        title: selection.title || "Projects Page",
      };
    },
  },
});
