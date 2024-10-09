// schemas/blockContent.js

export default {
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 1", value: "h1" } /* more styles */,
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          // more decorators
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "URL",
            fields: [{ name: "href", type: "url", title: "URL" }],
          },
        ],
      },
    },
    { type: "image" },
    // Add other types if needed
  ],
};
