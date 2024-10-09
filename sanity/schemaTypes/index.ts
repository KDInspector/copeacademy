import { type SchemaTypeDefinition } from "sanity";
import course from "./course";
import blockContent from "./blockContent";
import facecreate from "./faceCreate";
import lesson from "./lesson";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [course, blockContent, facecreate, lesson],
};
