import { defineArrayMember, defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Homepage - Graph Data",
  type: "document",
  groups: [{ name: "content", title: "Content", default: true }],
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      group: "content",
      initialValue: "Homepage",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "statistics",
      title: "Statistics",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "impactDistribution",
          title: "Impact distribution",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "name",
                  title: "Focus area",
                  type: "string",
                  options: {
                    list: [
                      { title: "Research", value: "Research" },
                      { title: "Assistive Solutions", value: "Assistive Solutions" },
                      { title: "Community", value: "Community" },
                      { title: "Inclusive Education", value: "Inclusive Education" },
                      { title: "Humanitarian", value: "Humanitarian" },
                    ],
                    layout: "dropdown",
                  },
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "value",
                  title: "Number to display",
                  type: "number",
                  validation: (rule) => rule.required().min(0),
                }),
              ],
              preview: {
                select: {
                  title: "name",
                  subtitle: "value",
                },
                prepare(selection) {
                  return {
                    title: selection.title,
                    subtitle:
                      typeof selection.subtitle === "number"
                        ? `${selection.subtitle}`
                        : "No value",
                  };
                },
              },
            }),
          ],
        }),
        defineField({
          name: "impactTrend",
          title: "Impact trend",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "year",
                  title: "Year",
                  type: "string",
                  options: {
                    list: [
                      { title: "2020", value: "2020" },
                      { title: "2021", value: "2021" },
                      { title: "2022", value: "2022" },
                      { title: "2023", value: "2023" },
                      { title: "2024", value: "2024" },
                      { title: "2025", value: "2025" },
                    ],
                    layout: "dropdown",
                  },
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "impact",
                  title: "Number to display",
                  type: "number",
                  validation: (rule) => rule.required().min(0),
                }),
              ],
              preview: {
                select: {
                  title: "year",
                  subtitle: "impact",
                },
                prepare(selection) {
                  return {
                    title: selection.title ?? "Year",
                    subtitle:
                      typeof selection.subtitle === "number"
                        ? `${selection.subtitle}`
                        : "No value",
                  };
                },
              },
            }),
          ],
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
        title: selection.title || "Homepage",
      };
    },
  },
});
