import { defineField, defineType } from "sanity";

export const globalStatsType = defineType({
  name: "globalStats",
  title: "Global - Stats",
  type: "document",
  groups: [{ name: "content", title: "Content", default: true }],
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      group: "content",
      initialValue: "Global Stats",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "livesImpacted",
      title: "Lives Impacted",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(20),
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(20),
    }),
    defineField({
      name: "partners",
      title: "Partners",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(20),
    }),
    defineField({
      name: "volunteers",
      title: "Volunteers",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(20),
    }),
    defineField({
      name: "states",
      title: "States",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(20),
    }),
    defineField({
      name: "events",
      title: "Events",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(20),
    }),
    defineField({
      name: "beneficiaries",
      title: "Beneficiaries",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(20),
    }),
  ],
  preview: {
    select: {
      title: "title",
      livesImpacted: "livesImpacted",
      projects: "projects",
    },
    prepare(selection) {
      return {
        title: selection.title || "Global Stats",
        subtitle: `${selection.livesImpacted ?? "No lives"} lives · ${selection.projects ?? "No projects"} projects`,
      };
    },
  },
});
