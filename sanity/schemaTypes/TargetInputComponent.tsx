import React, { useEffect } from "react";
import { setIfMissing, set } from "sanity";
import { nanoid } from "nanoid"; // Import nanoid to generate unique keys

interface TargetInputComponentProps {
  value: {
    targetFace?: { asset?: { _ref: string }; _type?: string };
    lineupFaces?: {
      image?: { asset?: { _ref: string }; _type?: string };
      correct?: boolean;
      _key?: string;
    }[];
  };
  onChange: (patch: any) => void;
  renderDefault: (props: any) => JSX.Element;
}

// This component wraps around the existing form components
function TargetInputComponent(props: TargetInputComponentProps) {
  const { value, onChange, renderDefault } = props;

  useEffect(() => {
    // Initialize lineupFaces if it's missing
    if (!value?.lineupFaces) {
      onChange(setIfMissing([], ["lineupFaces"]));
    }

    // If a targetFace is selected and it's not in lineupFaces, add it
    if (value?.targetFace && value.lineupFaces) {
      const targetImageId = value.targetFace?.asset?._ref;
      const lineupIds = value.lineupFaces.map((img) => img.image?.asset?._ref);

      // Check if targetFace is not in lineupFaces
      if (!lineupIds.includes(targetImageId)) {
        // Add targetFace wrapped as an object with correct set to true and a unique _key
        const targetFaceObject = {
          _key: nanoid(),
          image: { ...value.targetFace },
          correct: true,
        };

        onChange(
          set([...value.lineupFaces, targetFaceObject], ["lineupFaces"])
        );
      }
    }
  }, [value?.targetFace, value?.lineupFaces, onChange]);

  // Render the default input fields for the object
  return <>{renderDefault(props)}</>;
}

export default TargetInputComponent;
