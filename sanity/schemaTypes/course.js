// schemas/course.js

export default {
  name: "course",
  title: "Course",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: "description",
      title: "Description",
      type: "text", // Consider using 'blockContent' for rich text if needed
      validation: (Rule) => Rule.required(),
    },
    {
      name: "accessLevel",
      title: "Access Level",
      type: "string",
      options: {
        list: [
          { title: "Premium", value: "premium" },
          { title: "Free", value: "free" },
        ],
        layout: "radio", // Display options as radio buttons
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "duration",
      title: "Duration",
      type: "string",
      description: "e.g., '45 mins', '1 hour 30 mins'",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "previewImage",
      title: "Preview Image",
      type: "image",
      options: {
        hotspot: true, // Enables image cropping
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "courseType",
      title: "Course Type",
      type: "string",
      options: {
        list: [
          { title: "Standard", value: "standard" },
          { title: "Face Recreate", value: "faceRecreate" },
          // Add more types as needed
        ],
        layout: "radio", // Display options as radio buttons
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "faceCreateModule",
      title: "Face Create Module",
      type: "reference",
      to: [{ type: "faceCreate" }], // Reference to faceCreate document
      hidden: ({ parent }) => parent?.courseType !== "faceRecreate",
      description: "Reference to the Face Create module for this course.",
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context.parent.courseType === "faceRecreate" && !field) {
            return "Face Create Module is required for Face Recreate courses.";
          }
          return true;
        }),
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      options: {
        dateFormat: "MMM DD, YYYY",
        timeFormat: "HH:mm",
        timeStep: 15,
      },
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
      options: {
        dateFormat: "MMM DD, YYYY",
        timeFormat: "HH:mm",
        timeStep: 15,
      },
      readOnly: true,
      // Use a document action or a webhook to update this field on changes
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "previewImage",
      accessLevel: "accessLevel",
      courseType: "courseType",
    },
    prepare(selection) {
      const { title, media, accessLevel, courseType } = selection;
      return {
        title,
        media,
        subtitle: `${accessLevel.charAt(0).toUpperCase() + accessLevel.slice(1)} | ${courseType.charAt(0).toUpperCase() + courseType.slice(1)}`,
      };
    },
  },
};
