"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import { faceCreateModuleQuery } from "@/lib/queries";
import { cn } from "@/lib/utils";

// Define the Module interface
interface Module {
  _id: string;
  title: string;
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
  instruction: string;
}

// **Remove the `export` keyword here**
const LoadingSpinner: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("animate-spin", className)}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    <path d="M12 21v-6" />
  </svg>
);

const ModulePage = () => {
  const router = useRouter();
  const params = useParams();

  // Extract 'slug' from params
  const slug = params.slug as string; // Expected to be the module ID

  const [module, setModule] = useState<Module | null>(null);
  const [videoURL, setVideo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModule = async () => {
      setIsLoading(true);
      try {
        const fetchedModule: Module = await client.fetch(
          faceCreateModuleQuery,
          {
            id: slug, // Pass 'slug' as the 'id' parameter
          }
        );
        console.log("Fetched Module:", fetchedModule);
        setModule(fetchedModule);

        // Determine the video URL based on videoType
        const videoUrl =
          fetchedModule.moduleVideo.videoType === "link"
            ? fetchedModule.moduleVideo.videoURL
            : fetchedModule.moduleVideo.uploadedVideo?.asset.url;

        setVideo(videoUrl ?? null);
      } catch (err) {
        console.error("Error fetching module:", err);
        setError("Failed to load the module. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchModule();
    } else {
      console.log("Slug is undefined");
      setError("Module ID is missing.");
    }
  }, [slug, params]);

  const handleVideoEnd = () => {
    // Redirect to the instruction page upon video completion
    router.push(`/courses/gezichts-recreatie/${slug}/recreate`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen text-gray-500 dark:text-gray-200">
        <LoadingSpinner className="w-12 h-12" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="flex justify-center items-center w-full h-screen text-gray-500 dark:text-gray-200">
        <LoadingSpinner className="w-12 h-12" />
      </div>
    );
  }

  if (!videoURL) {
    return (
      <div className="flex justify-center items-center w-full h-screen text-red-500">
        <p>Video URL not available</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      <div className="h-1/2 w-full">
        <motion.div
          className="mx-auto p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <ReactPlayer
              url={videoURL}
              playing
              muted
              controls={false}
              onEnded={handleVideoEnd}
              width="100%"
              height="100%"
              style={{ position: "absolute", top: 0, left: 0 }}
              config={{
                youtube: {
                  playerVars: {
                    autoplay: 1,
                    controls: 0,
                    modestbranding: 1,
                    showinfo: 0,
                    rel: 0,
                    iv_load_policy: 3,
                    disablekb: 1,
                    cc_load_policy: 0, // Turn off captions
                  },
                },
                file: {
                  attributes: {
                    preload: "metadata",
                  },
                },
              }}
              fallback={<p className="text-white">Loading video...</p>}
            />
            {/* Hide YouTube UI Elements */}
            <style jsx global>{`
              iframe {
                pointer-events: none;
              }
              iframe::-webkit-media-controls-panel {
                display: none !important;
              }
              .ytp-chrome-top,
              .ytp-chrome-bottom,
              .ytp-share-button,
              .ytp-watch-later-button,
              .ytp-watermark {
                display: none !important;
              }
            `}</style>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ModulePage;
