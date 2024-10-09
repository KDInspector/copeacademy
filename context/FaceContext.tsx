// context/FaceContext.tsx
"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";

// Define types for selections and results
interface FaceSelections {
  eyes: string | null;
  nose: string | null;
  mouth: string | null;
}

interface FaceResults {
  eyesCorrect: boolean;
  noseCorrect: boolean;
  mouthCorrect: boolean;
  faceCorrect: boolean;
  totalPoints: number;
}

interface FaceContextProps {
  selections: FaceSelections;
  setSelections: (selections: FaceSelections) => void;
  results: FaceResults | null;
  setResults: (results: FaceResults) => void;
  correctComponents: FaceSelections | null;
  setCorrectComponents: (components: FaceSelections) => void;
}

const FaceContext = createContext<FaceContextProps | undefined>(undefined);

// Provider component
export const FaceProvider = ({ children }: { children: ReactNode }) => {
  const [selections, setSelections] = useState<FaceSelections>({
    eyes: null,
    nose: null,
    mouth: null,
  });

  const [results, setResults] = useState<FaceResults | null>(null);
  const [correctComponents, setCorrectComponents] =
    useState<FaceSelections | null>(null);

  return (
    <FaceContext.Provider
      value={{
        selections,
        setSelections,
        results,
        setResults,
        correctComponents,
        setCorrectComponents,
      }}
    >
      {children}
    </FaceContext.Provider>
  );
};

// Custom hook for consuming the context
export const useFaceContext = () => {
  const context = useContext(FaceContext);
  if (!context) {
    throw new Error("useFaceContext must be used within a FaceProvider");
  }
  return context;
};
