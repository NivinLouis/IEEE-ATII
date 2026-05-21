import { defineField, defineType } from "sanity";

export const photoGalleryItemType = defineType({
  name: "photoGalleryItem",
  title: "Photo Gallery Item",
  type: "document",
  fields: [
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
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
      title: "caption",
      subtitle: "sortOrder",
      media: "image",
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `Order ${selection.subtitle ?? 0}`,
        media: selection.media,
      };
    },
  },
});
