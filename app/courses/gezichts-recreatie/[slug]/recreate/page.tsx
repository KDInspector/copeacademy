// app/recreate/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { client } from "@/sanity/lib/client";
import { faceComponentModuleQuery } from "@/lib/queries";
import FacePreview from "@/components/components/FacePreview";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useFaceContext } from "@/context/FaceContext"; // Import the custom hook
import { Card } from "@/components/ui/card";

// Image imports (Static fillers)
import e1 from "@/app/images/fillers/eyes/1.png";
import e2 from "@/app/images/fillers/eyes/2.png";
import n1 from "@/app/images/fillers/nose/1.png";
import n2 from "@/app/images/fillers/nose/2.png";
import m1 from "@/app/images/fillers/mouth/1.png";
import m2 from "@/app/images/fillers/mouth/2.png";

// Interface for Sanity data
interface SanityImage {
  asset: {
    _id: string; // Add _id to fetch the Sanity UUID
    url: string;
  };
}

// Static options for eyes, nose, and mouth with UUID
const staticEyesOptions = [
  { id: uuidv4(), url: e1.src, label: "Eyes 1" },
  { id: uuidv4(), url: e2.src, label: "Eyes 2" },
];

const staticNoseOptions = [
  { id: uuidv4(), url: n1.src, label: "Nose 1" },
  { id: uuidv4(), url: n2.src, label: "Nose 2" },
];

const staticMouthOptions = [
  { id: uuidv4(), url: m1.src, label: "Mouth 1" },
  { id: uuidv4(), url: m2.src, label: "Mouth 2" },
];

const RecreatePage: React.FC = () => {
  const { selections, setSelections, setCorrectComponents } = useFaceContext(); // Use context
  const [eyesOptions, setEyesOptions] = useState(staticEyesOptions);
  const [nosesOptions, setNosesOptions] = useState(staticNoseOptions);
  const [mouthOptions, setMouthOptions] = useState(staticMouthOptions);

  const router = useRouter();

  // Fetch face components from Sanity
  useEffect(() => {
    const fetchFaceComponents = async () => {
      try {
        const result = await client.fetch(faceComponentModuleQuery);

        const faceCreate = result[0];
        if (!faceCreate) {
          throw new Error("No faceCreate document found.");
        }

        // Extract correct components from targetFace
        // Since the schema doesn't specify which components make up the targetFace,
        // we'll assume that the first component in each category is correct for simplicity
        // Adjust this logic based on your actual data associations

        const target = faceCreate.targets[0];
        if (!target) {
          throw new Error("No target found in faceCreate.");
        }

        // Assume that the correct components are the ones associated with the correct lineup face
        // Find the lineupFace marked as correct
        const correctLineupFace = target.lineupFaces.find(
          (face: any) => face.correct
        );
        if (!correctLineupFace) {
          throw new Error("No correct lineup face marked in Sanity.");
        }

        // Now, we need to determine which components make up the correct lineup face
        // This requires a mapping between the lineup face and its components
        // Since the schema doesn't provide this, we'll assume that the correct lineup face's components match the first components

        // For demonstration, let's map the correct lineup face to specific components
        // Adjust this based on your actual data structure or naming conventions

        // Example mapping (you need to adjust this)
        const correctFaceId = correctLineupFace.image.asset._ref;

        // Fetch correct components based on correctFaceId
        // Since we don't have a direct link, we'll make an assumption
        // For example, map the correct face to the first component in each category

        const correctEyesId =
          faceCreate.faceComponents.eyes[0]?.asset._id || null;
        const correctNoseId =
          faceCreate.faceComponents.noses[0]?.asset._id || null;
        const correctMouthId =
          faceCreate.faceComponents.mouths[0]?.asset._id || null;

        setCorrectComponents({
          eyes: correctEyesId,
          nose: correctNoseId,
          mouth: correctMouthId,
        });

        const sanityEyes = faceCreate.faceComponents?.eyes.map(
          (item: SanityImage) => ({
            id: item.asset._id, // Use Sanity UUID as the id
            url: item.asset.url,
            label: "Sanity Eye",
          })
        );

        const sanityNoses = faceCreate.faceComponents?.noses.map(
          (item: SanityImage) => ({
            id: item.asset._id, // Use Sanity UUID as the id
            url: item.asset.url,
            label: "Sanity Nose",
          })
        );

        const sanityMouths = faceCreate.faceComponents?.mouths.map(
          (item: SanityImage) => ({
            id: item.asset._id, // Use Sanity UUID as the id
            url: item.asset.url,
            label: "Sanity Mouth",
          })
        );

        // Combine static and fetched data and randomize the order
        setEyesOptions(
          [...staticEyesOptions, ...sanityEyes].sort(() => Math.random() - 0.5)
        );
        setNosesOptions(
          [...staticNoseOptions, ...sanityNoses].sort(() => Math.random() - 0.5)
        );
        setMouthOptions(
          [...staticMouthOptions, ...sanityMouths].sort(
            () => Math.random() - 0.5
          )
        );
      } catch (err: any) {
        console.error("Failed to fetch face components:", err);
        alert(err.message || "Failed to fetch face components.");
      }
    };

    fetchFaceComponents();
  }, [setCorrectComponents]);

  // Save selected UUIDs to context and redirect
  const handleSave = () => {
    // Ensure all selections are made
    if (!selections.eyes || !selections.nose || !selections.mouth) {
      alert("Please select eyes, nose, and mouth.");
      return;
    }

    // Redirect to lineup page
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace("/recreate", "/lineup");
    router.push(newPath);
  };

  return (
    <div className="min-h-screen h-full w-full flex flex-col md:flex-row">
      <motion.div
        className="flex-1 h-full p-4 md:p-8 flex flex-col items-center md:flex-row"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Sidebar for Component Selection */}
        <div className="w-full md:w-1/3 h-full p-4 flex flex-col justify-center">
          {/* Accordion for Eyes, Nose, and Mouth */}
          <Accordion type="single" collapsible className="w-full space-y-4">
            {/* Eyes */}
            <AccordionItem value="eyes">
              <AccordionTrigger className="text-lg text-gray-800 dark:text-gray-200">
                Eyes
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  {eyesOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() =>
                        setSelections({ ...selections, eyes: option.id })
                      }
                      className={`cursor-pointer p-1 rounded-md transition-all duration-200 ease-in-out ${
                        selections.eyes === option.id
                          ? "ring-2 ring-blue-500 shadow-lg"
                          : "hover:ring-2 hover:ring-gray-300"
                      }`}
                    >
                      <Image
                        width={300}
                        height={300}
                        src={option.url}
                        alt={option.label}
                        className="object-cover w-full h-auto rounded-md grayscale"
                      />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Nose */}
            <AccordionItem value="nose">
              <AccordionTrigger className="text-lg text-gray-800 dark:text-gray-200">
                Nose
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  {nosesOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() =>
                        setSelections({ ...selections, nose: option.id })
                      }
                      className={`cursor-pointer p-1 rounded-md transition-all duration-200 ease-in-out ${
                        selections.nose === option.id
                          ? "ring-2 ring-blue-500 shadow-lg"
                          : "hover:ring-2 hover:ring-gray-300"
                      }`}
                    >
                      <Image
                        width={300}
                        height={300}
                        src={option.url}
                        alt={option.label}
                        className="object-cover w-full h-auto rounded-md grayscale"
                      />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Mouth */}
            <AccordionItem value="mouth">
              <AccordionTrigger className="text-lg text-gray-800 dark:text-gray-200">
                Mouth
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  {mouthOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() =>
                        setSelections({ ...selections, mouth: option.id })
                      }
                      className={`cursor-pointer p-1 rounded-md transition-all duration-200 ease-in-out ${
                        selections.mouth === option.id
                          ? "ring-2 ring-blue-500 shadow-lg"
                          : "hover:ring-2 hover:ring-gray-300"
                      }`}
                    >
                      <Image
                        width={300}
                        height={300}
                        src={option.url}
                        alt={option.label}
                        className="object-cover w-full h-auto rounded-md grayscale"
                      />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Save Button */}
          <Button
            className="w-full text-xl py-3 rounded-lg transition-transform transform hover:scale-105 mt-6"
            onClick={handleSave} // Save the selected UUIDs to context and redirect
          >
            Go to Lineup
          </Button>
        </div>

        {/* Right Side Face Preview */}
        <div className="flex-1 h-full flex justify-center items-center ">
          <Card className="w-full h-full md:w-3/4 md:h-3/4 flex justify-center items-center dark:bg-black bg-white dark:border-neutral-700 border-neutral-300 shadow-md">
            <div className="dark:bg-grid-white/[0.16] bg-grid-black/[0.16] rounded-lg">
              <FacePreview
                eyes={
                  selections.eyes
                    ? eyesOptions.find((e) => e.id === selections.eyes)?.url
                    : null
                }
                nose={
                  selections.nose
                    ? nosesOptions.find((n) => n.id === selections.nose)?.url
                    : null
                }
                mouth={
                  selections.mouth
                    ? mouthOptions.find((m) => m.id === selections.mouth)?.url
                    : null
                }
              />
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default RecreatePage;
