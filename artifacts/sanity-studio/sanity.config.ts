import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET;

if (!projectId) {
  throw new Error("SANITY_STUDIO_PROJECT_ID is required.");
}

if (!dataset) {
  throw new Error("SANITY_STUDIO_DATASET is required.");
}

export default defineConfig({
  name: "default",
  title: "IEEE ATIIG News Studio",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
