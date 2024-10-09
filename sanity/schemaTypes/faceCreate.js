import TargetInputComponent from "./TargetInputComponent";

export default {
  name: "faceCreate",
  title: "Face Create Module",
  type: "document", // Changed from "object" to "document"
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "faceComponents",
      title: "Face Components",
      type: "object",
      fields: [
        {
          name: "eyes",
          title: "Eyes",
          type: "array",
          of: [{ type: "image" }],
          options: {
            hotspot: true,
          },
          description: "Add different eye styles.",
          validation: (Rule) =>
            Rule.required().min(1, "At least one eye option is required."),
        },
        {
          name: "noses",
          title: "Noses",
          type: "array",
          of: [{ type: "image" }],
          options: {
            hotspot: true,
          },
          description: "Add different nose styles.",
          validation: (Rule) =>
            Rule.required().min(1, "At least one nose option is required."),
        },
        {
          name: "mouths",
          title: "Mouths",
          type: "array",
          of: [{ type: "image" }],
          options: {
            hotspot: true,
          },
          description: "Add different mouth styles.",
          validation: (Rule) =>
            Rule.required().min(1, "At least one mouth option is required."),
        },
      ],
      validation: (Rule) =>
        Rule.required().error("Face components are required."),
    },
    {
      name: "moduleVideo",
      title: "Module Video",
      type: "object",
      fields: [
        {
          name: "videoType",
          title: "Video Type",
          type: "string",
          options: {
            list: [
              { title: "Upload Video", value: "upload" },
              { title: "Video URL", value: "link" },
            ],
            layout: "radio",
          },
          validation: (Rule) =>
            Rule.required().error("Please select a video type."),
        },
        {
          name: "videoURL",
          title: "Video URL",
          type: "url",
          description: "Enter a YouTube link or any other video URL.",
          hidden: ({ parent }) => parent?.videoType !== "link",
          validation: (Rule) =>
            Rule.custom((_, context) => {
              const { parent } = context;
              if (parent?.videoType === "link" && !_) {
                return "A valid video URL is required.";
              }
              return true;
            }).uri({
              allowRelative: false,
              scheme: ["https", "http"],
            }),
        },
        {
          name: "uploadedVideo",
          title: "Uploaded Video",
          type: "file",
          options: {
            accept: "video/*",
          },
          description: "Upload a video file.",
          hidden: ({ parent }) => parent?.videoType !== "upload",
          validation: (Rule) =>
            Rule.custom((_, context) => {
              const { parent } = context;
              if (parent?.videoType === "upload" && !_) {
                return "Please upload a video file.";
              }
              return true;
            }),
        },
      ],
      validation: (Rule) =>
        Rule.custom((field) => {
          if (!field) {
            return "Module video is required.";
          }
          const { videoType, videoURL, uploadedVideo } = field;
          if (videoType === "link" && !videoURL) {
            return "Video URL is required when 'Video Type' is set to 'Video URL'.";
          }
          if (videoType === "upload" && !uploadedVideo) {
            return "Uploaded video is required when 'Video Type' is set to 'Upload Video'.";
          }
          return true;
        }).error("Invalid video configuration."),
    },

    // Targets Field
    {
      name: "targets",
      title: "Targets",
      type: "array",
      of: [
        {
          type: "object",
          name: "target",
          title: "Target",
          components: {
            input: TargetInputComponent, // Use the custom input component
          },
          fields: [
            {
              name: "targetFace",
              title: "Target Face",
              type: "image",
              options: {
                hotspot: true,
              },
              description:
                "Select an existing image or upload a new one. This face will be included in the lineup.",
              validation: (Rule) =>
                Rule.required().error("Target face image is required."),
            },
            {
              name: "lineupFaces",
              title: "Lineup Faces",
              type: "array",
              of: [
                // Support new format (object with an image and correct boolean)
                {
                  type: "object",
                  fields: [
                    {
                      name: "image",
                      title: "Image",
                      type: "image",
                      options: {
                        hotspot: true,
                      },
                      description:
                        "All lineup faces must be cropped to square (1:1 aspect ratio) using the crop tool.",
                      validation: (Rule) =>
                        Rule.required().error("Lineup face image is required."),
                    },
                    {
                      name: "correct",
                      title: "Correct",
                      type: "boolean",
                      description: "Mark this face as the correct one.",
                      initialValue: false, // Optional: Default value
                    },
                  ],
                  preview: {
                    select: {
                      title: "image.asset._ref",
                      correct: "correct",
                      media: "image",
                    },
                    prepare(selection) {
                      const { correct, media } = selection;
                      return {
                        title: correct ? "Correct Face" : "Incorrect Face",
                        media: media,
                      };
                    },
                  },
                },
                // Support old format (direct type: image)
                {
                  type: "image",
                  options: {
                    hotspot: true,
                  },
                  description:
                    "This is the old format. Please migrate it to the new format by adding a correct toggle.",
                },
              ],
              description:
                "Select existing images or upload new ones to include in the lineup for this target. Ensure the lineup contains exactly 5 square (1:1 aspect ratio) faces.",
              validation: (Rule) =>
                Rule.required().length(
                  5,
                  "Exactly 5 lineup faces are required."
                ),
              options: {
                layout: "grid",
              },
            },
          ],
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1, "At least one target is required.")
          .max(5, "No more than 5 targets are allowed."), // Adjust max as needed
    },
  ],
};
