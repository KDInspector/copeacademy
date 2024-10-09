"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { client } from "@/sanity/lib/client"; // Import Sanity client
import { faceComponentModuleQuery } from "@/lib/queries"; // Import your GROQ query
import FacePreview from "@/components/components/FacePreview";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import { useRouter } from "next/navigation"; // Import useRouter

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
  { id: uuidv4(), url: e1.src, label: "Eyes 1" }, // Convert StaticImageData to string using .src
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
  const [selectedEyes, setSelectedEyes] = useState<string | null>(null);
  const [selectedNose, setSelectedNose] = useState<string | null>(null);
  const [selectedMouth, setSelectedMouth] = useState<string | null>(null);

  const [eyesOptions, setEyesOptions] = useState(staticEyesOptions);
  const [nosesOptions, setNosesOptions] = useState(staticNoseOptions);
  const [mouthOptions, setMouthOptions] = useState(staticMouthOptions);

  const router = useRouter(); // Use Next.js router

  // Fetch face components from Sanity
  useEffect(() => {
    const fetchFaceComponents = async () => {
      try {
        const result = await client.fetch(faceComponentModuleQuery);

        const sanityEyes = result[0].faceComponents?.eyes.map(
          (item: SanityImage) => ({
            id: item.asset._id, // Use Sanity UUID as the id
            url: item.asset.url,
            label: "Sanity Eye",
          })
        );
        const sanityNoses = result[0].faceComponents?.noses.map(
          (item: SanityImage) => ({
            id: item.asset._id, // Use Sanity UUID as the id
            url: item.asset.url,
            label: "Sanity Nose",
          })
        );
        const sanityMouths = result[0].faceComponents?.mouths.map(
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
      } catch (err) {
        console.error("Failed to fetch face components:", err);
      }
    };

    fetchFaceComponents();
  }, []);

  // Save selected UUIDs to cookies and redirect
  const handleSave = () => {
    // Use cookies from Next.js
    document.cookie = `selectedEyes=${selectedEyes || ""}; path=/`;
    document.cookie = `selectedNose=${selectedNose || ""}; path=/`;
    document.cookie = `selectedMouth=${selectedMouth || ""}; path=/`;

    // Redirect to lineup page
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace("/recreate", "/lineup");
    router.push(newPath); // Redirect to the lineup page
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
                      onClick={() => setSelectedEyes(option.id)} // Save the UUID in state
                      className={`cursor-pointer p-1 rounded-md transition-all duration-200 ease-in-out ${
                        selectedEyes === option.id
                          ? "ring-2 ring-blue-500 shadow-lg"
                          : "hover:ring-2 hover:ring-gray-300"
                      }`}
                    >
                      <Image
                        width={300}
                        height={300}
                        src={option.url}
                        alt={option.label}
                        className="object-cover w-full h-auto rounded-md"
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
                      onClick={() => setSelectedNose(option.id)} // Save the UUID in state
                      className={`cursor-pointer p-1 rounded-md transition-all duration-200 ease-in-out ${
                        selectedNose === option.id
                          ? "ring-2 ring-blue-500 shadow-lg"
                          : "hover:ring-2 hover:ring-gray-300"
                      }`}
                    >
                      <Image
                        width={300}
                        height={300}
                        src={option.url}
                        alt={option.label}
                        className="object-cover w-full h-auto rounded-md"
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
                      onClick={() => setSelectedMouth(option.id)} // Save the UUID in state
                      className={`cursor-pointer p-1 rounded-md transition-all duration-200 ease-in-out ${
                        selectedMouth === option.id
                          ? "ring-2 ring-blue-500 shadow-lg"
                          : "hover:ring-2 hover:ring-gray-300"
                      }`}
                    >
                      <Image
                        width={300}
                        height={300}
                        src={option.url}
                        alt={option.label}
                        className="object-cover w-full h-auto rounded-md"
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
            onClick={handleSave} // Save the selected UUIDs to cookies and redirect
          >
            Go to lineup
          </Button>
        </div>

        {/* Right Side Face Preview */}
        <div className="flex-1 h-full flex justify-center items-center ">
          <Card className="w-full h-full md:w-3/4 md:h-3/4 flex justify-center items-center dark:bg-black bg-white dark:border-neutral-700 border-neutral-300 shadow-md">
            <div className="dark:bg-grid-white/[0.16] bg-grid-black/[0.16] rounded-lg">
              <FacePreview
                eyes={
                  selectedEyes
                    ? eyesOptions.find((e) => e.id === selectedEyes)?.url
                    : null
                }
                nose={
                  selectedNose
                    ? nosesOptions.find((n) => n.id === selectedNose)?.url
                    : null
                }
                mouth={
                  selectedMouth
                    ? mouthOptions.find((m) => m.id === selectedMouth)?.url
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
