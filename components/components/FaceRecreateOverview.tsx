// components/FaceRecreateOverview.tsx

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/components/VideoPlayer";
import Placeholder from "@/app/images/placeholder.webp";

interface FaceRecreateOverviewProps {
  course: Course;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  accessLevel: "premium" | "free";
  duration: string;
  previewImage: {
    asset: {
      _id: string;
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
        lqip: string;
        palette: Record<string, unknown>;
      };
    };
    alt?: string;
  };
  slug: {
    current: string;
  };
  createdAt: string;
  updatedAt: string;
  faceCreateModule: {
    moduleVideo: {
      videoType: "upload" | "link";
      videoURL?: string;
      uploadedVideo?: {
        asset: {
          _id: string;
          url: string;
        };
      };
    };
    targets: {
      targetFace: {
        asset: {
          _id: string;
          url: string;
        };
      };
      lineupFaces: {
        asset: {
          _id: string;
          url: string;
        };
      }[];
    }[];
    instruction: string;
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const FaceRecreateOverview: React.FC<FaceRecreateOverviewProps> = ({
  course,
}) => {
  const { faceCreateModule } = course;

  if (!faceCreateModule) {
    return null; // Or a fallback UI
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mb-12"
    >
      <h3 className="font-bold mb-6 text-2xl text-black dark:text-white">
        Face Recreate Module
      </h3>
      <motion.div
        className="bg-gray-100 dark:bg-neutral-800 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center"
        variants={cardVariants}
      >
        {/* Video Section */}
        <div className="w-full md:w-1/2">
          <VideoPlayer
            videoURL={
              faceCreateModule.moduleVideo.videoType === "link"
                ? faceCreateModule.moduleVideo.videoURL
                : undefined
            }
            uploadedVideoURL={
              faceCreateModule.moduleVideo.videoType === "upload"
                ? faceCreateModule.moduleVideo.uploadedVideo?.asset.url
                : undefined
            }
          />
        </div>
        {/* Instruction Section */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-6">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            {faceCreateModule.instruction}
          </h4>
          <Button
            onClick={() =>
              (window.location.href = `/courses/${course.slug.current}/face-create`)
            }
            className="mt-4"
          >
            Start Face Create
          </Button>
        </div>
      </motion.div>

      {/* Targets Overview */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mt-8"
      >
        <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Targets and Lineups
        </h4>
        <div className="space-y-6">
          {faceCreateModule.targets.map((target, index) => (
            <motion.div
              key={index}
              className="flex flex-col md:flex-row items-center bg-gray-200 dark:bg-neutral-700 rounded-lg p-4"
              variants={cardVariants}
            >
              {/* Target Face */}
              <div className="w-24 h-24 relative rounded-full overflow-hidden">
                <Image
                  src={target.targetFace.asset.url || Placeholder}
                  alt={`Target ${index + 1} Face`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              {/* Lineup Faces */}
              <div className="mt-4 md:mt-0 md:ml-6 grid grid-cols-5 gap-4">
                {target.lineupFaces.map((lineup, idx) => (
                  <div
                    key={lineup.asset._id}
                    className="w-16 h-16 relative rounded-full overflow-hidden cursor-pointer hover:opacity-80 transition-opacity duration-200"
                  >
                    <Image
                      src={lineup.asset.url || Placeholder}
                      alt={`Lineup ${idx + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FaceRecreateOverview;
