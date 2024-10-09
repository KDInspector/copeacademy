// app/results/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useFaceContext } from "@/context/FaceContext"; // Import the custom hook
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // To get window dimensions
import { Check, X } from "lucide-react";

const ResultsPage: React.FC = () => {
  const { results } = useFaceContext();
  const router = useRouter();
  const { width, height } = useWindowSize();

  // If results are not set, redirect to recreate page
  if (!results) {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace("/results", "/recreate");
      router.push(newPath);
    }
    return null;
  }

  const { eyesCorrect, noseCorrect, mouthCorrect, faceCorrect, totalPoints } =
    results;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
      },
    }),
  };

  const pointsVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 1 } },
  };

  const getFeedbackMessage = () => {
    if (totalPoints === 6) return "Perfecte Score! 🎉";
    if (totalPoints >= 4) return "Goed gedaan!";
    if (totalPoints >= 2) return "Good geprobeerd!";
    return "Probeer beter kenmerken te herkennen";
  };

  return (
    <div className="overflow-x-hidden min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br p-4 relative">
      {/* Confetti for Perfect Score */}
      {totalPoints === 6 && <Confetti width={width} height={height} />}

      <motion.div
        className="bg-white dark:bg-neutral-900 p-8 md:p-12 rounded-2xl shadow-2xl max-w-xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Animated Heading */}
        <motion.h2
          className="text-4xl font-extrabold mb-6 text-center text-gray-800 dark:text-white"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Resultaat
        </motion.h2>

        {/* Results Indicators */}
        <div className="space-y-4">
          {[
            { label: "Eyes", correct: eyesCorrect },
            { label: "Nose", correct: noseCorrect },
            { label: "Mouth", correct: mouthCorrect },
            { label: "Overall Face", correct: faceCorrect },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="flex items-center space-x-4 p-4 rounded-lg bg-gray-100 dark:bg-neutral-800"
              custom={index}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Correctness Icon */}
              {item.correct ? (
                <Check className="text-green-500 text-2xl" />
              ) : (
                <X className="text-red-500 text-2xl" />
              )}

              {/* Result Text */}
              <div className="text-lg font-medium text-gray-800 dark:text-gray-200">
                {item.label}: {item.correct ? "Correct" : "Incorrect"}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Total Points */}
        <motion.div
          className="mt-6 text-center"
          variants={pointsVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-3xl font-bold text-purple-600 dark:text-purple-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            Totaal: {totalPoints}
          </motion.p>
        </motion.div>

        {/* Feedback Message */}
        <motion.p
          className="mt-2 text-center text-xl text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          {getFeedbackMessage()}
        </motion.p>

        {/* Animated Try Again Button */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          <Button
            className="w-full py-3 text-lg font-semibold  rounded-lg  transition-colors duration-300 flex items-center justify-center space-x-2"
            onClick={() => router.push("/courses")}
            variant="outline"
          >
            <span>Opnieuw proberen</span>
            {/* Animated Arrow Icon */}
            <motion.span
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResultsPage;
