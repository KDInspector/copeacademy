// app/lineup/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useFaceContext } from "@/context/FaceContext";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface LineupFace {
  id: string;
  url: string;
  label: string;
  correct: boolean;
}

const LineupPage: React.FC = () => {
  const { selections, setResults, correctComponents } = useFaceContext();
  const [lineupFaces, setLineupFaces] = useState<LineupFace[]>([]);
  const [selectedFace, setSelectedFace] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchLineup = async () => {
      try {
        const query = `
          *[_type == "faceCreate"]{
            _id,
            targets[]{
              targetFace{
                asset->{
                  _ref,
                  url
                }
              },
              lineupFaces[]{
                image{
                  asset->{
                    _ref,
                    url
                  }
                },
                correct
              }
            }
          }
        `;
        const data = await client.fetch(query);

        if (data.length === 0) {
          throw new Error("No lineup data found.");
        }

        const faceCreate = data[0];
        const target = faceCreate.targets[0];

        if (!target) {
          throw new Error("No target found in faceCreate.");
        }

        const fetchedLineupFaces: LineupFace[] = target.lineupFaces.map(
          (face: any, index: number) => ({
            id: face.image.asset._ref || index.toString(),
            url: urlFor(face.image).width(300).height(300).fit("crop").url(),
            label: `Face ${index + 1}`,
            correct: face.correct,
          })
        );

        setLineupFaces(fetchedLineupFaces);
        setLoading(false);
      } catch (err: any) {
        console.error("Failed to fetch lineup faces:", err);
        setError(err.message || "Failed to load lineup.");
        setLoading(false);
      }
    };

    fetchLineup();
  }, []);

  const handleSubmit = () => {
    if (selectedFace === null) return;

    const selected = lineupFaces.find((face) => face.id === selectedFace);
    if (!selected) return;

    const faceCorrect = selected.correct;

    // Initialize correctness flags
    let eyesCorrect = false;
    let noseCorrect = false;
    let mouthCorrect = false;

    if (correctComponents) {
      eyesCorrect = selections.eyes === correctComponents.eyes;
      noseCorrect = selections.nose === correctComponents.nose;
      mouthCorrect = selections.mouth === correctComponents.mouth;
    }

    // Calculate total points
    const totalPoints =
      (eyesCorrect ? 1 : 0) +
      (noseCorrect ? 1 : 0) +
      (mouthCorrect ? 1 : 0) +
      (faceCorrect ? 3 : 0);

    // Set the results in context
    setResults({
      eyesCorrect,
      noseCorrect,
      mouthCorrect,
      faceCorrect,
      totalPoints,
    });

    // Redirect to results page
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace("/lineup", "/results");
    router.push(newPath);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen h-full w-full flex justify-center items-center">
      <motion.div
        className="flex-1 p-4 flex flex-col justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full md:w-2/3 h-full p-4 flex flex-col justify-center items-center">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold dark:text-gray-200 text-gray-800">
              Choose the Matching Face
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Select the face that matches your selected components.
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-8 justify-center items-center">
            {lineupFaces.map((face) => (
              <div
                key={face.id}
                onClick={() => {
                  setSelectedFace(face.id);
                }}
                className={`cursor-pointer p-1 rounded-md transition-all duration-200 ease-in-out ${
                  selectedFace === face.id
                    ? "ring-2 ring-blue-500 shadow-lg"
                    : "hover:ring-2 hover:ring-gray-300"
                }`}
              >
                <Image
                  width={300}
                  height={300}
                  src={face.url}
                  alt={face.label}
                  className={`object-cover w-full h-auto rounded-md grayscale ${
                    selectedFace === face.id && face.correct
                      ? "border-4 border-green-500"
                      : ""
                  }`}
                />
              </div>
            ))}
          </div>

          <Button
            className="w-full text-xl py-3 rounded-lg transition-transform transform hover:scale-105"
            onClick={handleSubmit}
            disabled={selectedFace === null}
          >
            Submit Your Choice
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default LineupPage;
