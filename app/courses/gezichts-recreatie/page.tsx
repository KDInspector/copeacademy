"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { faceCreateCourseQuery } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Define TypeScript interfaces for course data
interface ImageMetadata {
  dimensions?: {
    width: number;
    height: number;
  };
  lqip?: string; // low-quality image placeholder
  palette?: {
    darkMuted?: { background: string; foreground: string };
    lightVibrant?: { background: string; foreground: string };
  };
}

interface PreviewImage {
  asset: {
    _id: string;
    url: string;
    metadata?: ImageMetadata;
  };
  alt?: string | null;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  accessLevel: "premium" | "free";
  duration: string;
  previewImage: PreviewImage;
  slug: {
    current: string;
  };
  createdAt: string;
  updatedAt: string | null;
  faceCreateModule: {
    _id: string;
    title: string;
  };
}

const FaceRecreatePage = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const [lectureCount, setLectureCount] = useState<number>(1); // Set default to 1

  useEffect(() => {
    const fetchFaceCreateCourse = async () => {
      setIsLoading(true);
      try {
        const fetchedCourse: Course = await client.fetch(
          faceCreateCourseQuery,
          {
            slug: "gezichts-recreatie",
          }
        );
        const createdDate = new Date(fetchedCourse.createdAt);
        console.log(fetchedCourse);

        setFormattedDate(createdDate.toLocaleDateString());
        setCourse(fetchedCourse);

        // Since faceCreateModule is a single object, set lecture count to 1
        setLectureCount(1);
      } catch (err) {
        console.error("Error fetching Face Recreate course:", err);
        setError(
          "Failed to load the Face Recreate course. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaceCreateCourse();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen text-gray-500 dark:text-gray-200">
        Loading course...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!course) {
    return <div className="w-full h-screen"></div>; // Or a fallback UI
  }

  return (
    <div className="min-h-screen w-full">
      <div className="max-w-4xl mx-auto p-6 transition-colors duration-200 mt-12">
        {/* Animated Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Grid with Image and Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden"
              variants={itemVariants}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={course.previewImage.asset.url}
                  alt={course.previewImage.alt || course.title}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h1 className="text-2xl font-bold mb-2 dark:text-white">
                {course.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {course.description}
              </p>
              <div className="flex items-center mb-4">
                <span className="bg-neutral-500 text-white text-xs px-2 py-1 rounded mr-2 uppercase">
                  {course.accessLevel}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span className="mr-4">{formattedDate}</span>
              </div>
              <Button className="w-full bg-black dark:bg-white text-white dark:text-black">
                Continue
              </Button>
            </motion.div>
          </div>

          {/* Course Content with Animations */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              Course content
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  <div className="flex justify-between items-center w-full">
                    <span className="font-semibold dark:text-white">
                      {course.title}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {lectureCount} lecture{lectureCount > 1 ? "s" : ""} •{" "}
                      {course.duration}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {/* Animated Content */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href={`/courses/${course.slug.current}/${course.faceCreateModule._id}/intro`}
                    >
                      <motion.div
                        className="py-2 w-full cursor-pointer"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <p className="dark:text-gray-300">
                          {course.faceCreateModule.title}
                        </p>
                      </motion.div>
                    </Link>
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FaceRecreatePage;
