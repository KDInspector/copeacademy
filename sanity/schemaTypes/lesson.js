// schemas/lesson.js

export default {
  name: "lesson",
  title: "Lesson",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: "lessonType",
      title: "Lesson Type",
      type: "string",
      options: {
        list: [
          { title: "Standard Lesson", value: "standard" },
          { title: "Face Recreate Module", value: "faceRecreate" },
          // Add more lesson types as needed
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "content",
      title: "Content",
      type: "blockContent",
      hidden: ({ parent }) => parent?.lessonType !== "standard",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const { lessonType } = context.parent;
          if (lessonType === "standard" && !value) {
            return "Content is required for standard lessons.";
          }
          return true;
        }),
    },
    {
      name: "faceCreateModule",
      title: "Face Create Module",
      type: "faceCreate",
      hidden: ({ parent }) => parent?.lessonType !== "faceRecreate",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const { lessonType } = context.parent;
          if (lessonType === "faceRecreate" && !value) {
            return "Face Create Module details are required.";
          }
          return true;
        }),
    },
    {
      name: "order",
      title: "Order",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "isFree",
      title: "Is Free",
      type: "boolean",
      initialValue: false,
    },
    // Add any additional fields as needed
  ],
};
