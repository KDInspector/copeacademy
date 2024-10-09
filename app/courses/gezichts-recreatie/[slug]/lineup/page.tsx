"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Mocked Lineup Faces (You would fetch these from your Sanity or backend)
const mockLineupFaces = [
  { id: "1", url: "/images/lineup/face1.png", label: "Face 1" },
  { id: "2", url: "/images/lineup/face2.png", label: "Face 2" },
  { id: "3", url: "/images/lineup/face3.png", label: "Face 3" },
  { id: "4", url: "/images/lineup/face4.png", label: "Face 4" },
  { id: "5", url: "/images/lineup/face5.png", label: "Face 5" },
];

// Interface for lineup face options
interface LineupFace {
  id: string;
  url: string;
  label: string;
}

const LineupPage: React.FC = () => {
  const [lineupFaces] = useState<LineupFace[]>(mockLineupFaces); // Mocked data for now
  const [selectedFace, setSelectedFace] = useState<string | null>(null); // Selected face by user
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // Store correctness of the selection

  // Fetch lineup faces from Sanity (if needed)
  // useEffect(() => {
  //   const fetchLineupFaces = async () => {
  //     try {
  //       // Replace this with your actual fetch from Sanity or backend
  //       // const result =
  //       //   await client.fetch(/* Insert query to fetch lineup faces */);
  //       // Process the result and setLineupFaces
  //     } catch (err) {
  //       console.error("Failed to fetch lineup faces:", err);
  //     }
  //   };

  //   // Uncomment if fetching from Sanity
  //   // fetchLineupFaces();
  // }, []);

  const handleSubmit = () => {
    const correctFaceId = "2"; // Replace with actual correct face ID from Sanity or backend
    if (selectedFace === correctFaceId) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="min-h-screen h-full w-full flex flex-col md:flex-row">
      <motion.div
        className="flex-1 h-full p-4 md:p-8 flex flex-col items-center md:flex-row"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full md:w-2/3 h-full p-4 flex flex-col justify-center">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold dark:text-gray-200 text-gray-800">
              Choose the Matching Face
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Select the face that matches your selected components.
            </p>
          </div>

          {/* Lineup Faces Grid */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-8">
            {lineupFaces.map((face) => (
              <div
                key={face.id}
                onClick={() => setSelectedFace(face.id)}
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
                  className="object-cover w-full h-auto rounded-md"
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <Button
            className="w-full text-xl py-3 rounded-lg transition-transform transform hover:scale-105"
            onClick={handleSubmit}
          >
            Submit Your Choice
          </Button>

          {/* Feedback */}
          {isCorrect !== null && (
            <div
              className={`mt-6 text-center text-lg font-semibold ${
                isCorrect ? "text-green-500" : "text-red-500"
              }`}
            >
              {isCorrect ? "Correct Match! 🎉" : "Incorrect Match. Try Again."}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LineupPage;
