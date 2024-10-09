// app/courses/page.tsx

"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import {
  ChevronRightIcon,
  Clock4Icon,
  CircleDollarSignIcon,
  FilterIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Importing shadcn UI components
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { GeistSans } from "geist/font/sans";
import Placeholder from "@/app/images/placeholder.webp";
import BGDark from "@/app/images/BGDark.jpeg";
import BGLight from "@/app/images/BGLight.jpeg";
import { client } from "@/sanity/lib/client";
import { allCoursesQuery } from "@/lib/queries";

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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Define TypeScript interfaces for course and lesson data
interface Lesson {
  _id: string;
  title: string;
  description: string;
  duration: string;
  videoURL?: string;
  order: number;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  accessLevel: "premium" | "free";
  rating: number;
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
        palette: Record<string, unknown>; // Adjust based on your palette structure
      };
    };
    alt?: string;
  };
  slug: {
    current: string;
  };
  createdAt: string;
  updatedAt: string;
  lessons: Lesson[];
}

const CoursesPage = () => {
  // State for courses
  const [courses, setCourses] = useState<Course[]>([]);

  // State for filters
  const [selectedAccessLevels, setSelectedAccessLevels] = useState<string[]>([
    "premium",
    "free",
  ]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([
    "0-30",
    "30-60",
    "1-2h",
    "above-2h",
  ]);

  // State for sort
  const [selectedSort, setSelectedSort] = useState<string>("relevancy");

  // Loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle Access Level Change
  const handleAccessLevelChange = (level: string) => {
    setSelectedAccessLevels((prevLevels) =>
      prevLevels.includes(level)
        ? prevLevels.filter((l) => l !== level)
        : [...prevLevels, level]
    );
  };

  // Handle Duration Change
  const handleDurationChange = (duration: string) => {
    setSelectedDurations((prevDurations) =>
      prevDurations.includes(duration)
        ? prevDurations.filter((d) => d !== duration)
        : [...prevDurations, duration]
    );
  };

  // Handle Sort Change
  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
  };

  // Handle Clear All Filters
  const handleClearAll = () => {
    setSelectedAccessLevels([]);
    setSelectedDurations([]);
  };

  // Fetch all courses once on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const fetchedCourses: Course[] = await client.fetch(allCoursesQuery);
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
        // Optionally, set an error state here
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Helper function to convert duration strings to total minutes
  const parseDuration = (duration: string): number => {
    const regex = /(?:(\d+)\s*hours?)?\s*(?:(\d+)\s*mins?)?/i;
    const match = duration.match(regex);
    if (match) {
      const hours = parseInt(match[1] || "0", 10);
      const mins = parseInt(match[2] || "0", 10);
      return hours * 60 + mins;
    }
    return 0; // Default if parsing fails
  };

  // Enhance courses with parsed duration minutes
  const enhancedCourses = useMemo(() => {
    return courses.map((course) => ({
      ...course,
      durationMinutes: parseDuration(course.duration),
    }));
  }, [courses]);

  // Filtered and Sorted Courses
  const filteredCourses = useMemo(() => {
    return enhancedCourses
      .filter((course) =>
        selectedAccessLevels.length > 0
          ? selectedAccessLevels.includes(course.accessLevel)
          : true
      )
      .filter((course) => {
        if (selectedDurations.length === 0) return true;
        return selectedDurations.some((duration) => {
          switch (duration) {
            case "0-30":
              return course.durationMinutes <= 30;
            case "30-60":
              return (
                course.durationMinutes > 30 && course.durationMinutes <= 60
              );
            case "1-2h":
              return (
                course.durationMinutes > 60 && course.durationMinutes <= 120
              );
            case "above-2h":
              return course.durationMinutes > 120;
            default:
              return true;
          }
        });
      })
      .sort((a, b) => {
        switch (selectedSort) {
          case "rating-up":
            return b.rating - a.rating;
          case "rating-down":
            return a.rating - b.rating;
          case "created-up":
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          case "relevancy":
          default:
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        }
      });
  }, [enhancedCourses, selectedAccessLevels, selectedDurations, selectedSort]);

  return (
    <div
      className={`flex flex-col min-h-screen w-full max-w-[85vw] py-12 ${GeistSans.className}`}
    >
      {/* Main container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-full mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 max-w-4xl"
        >
          <div className="relative rounded-lg overflow-hidden shadow-lg bg-neutral-800">
            {/* Background Images for Light and Dark Modes */}
            <Image
              src={BGDark}
              alt="Online Course"
              width={1200}
              height={600}
              className="w-full h-48 object-cover opacity-85 dark:block hidden"
            />
            <Image
              src={BGLight}
              alt="Online Course"
              width={1200}
              height={600}
              className="w-full h-48 object-cover opacity-85 dark:hidden block"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start p-6 text-left">
              <div className="space-y-1">
                <h2 className="text-sm font-semibold tracking-wider uppercase text-white">
                  Online Course
                </h2>
                <h1 className="md:text-3xl text-lg font-extrabold text-white">
                  Improve your skills with our online courses
                </h1>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "/get-started")}
                className="mt-7 bg-white text-indigo-600 py-2 px-4 md:px-6 rounded-lg shadow-md hover:bg-gray-100 transition-transform duration-300 ease-in-out flex items-center justify-center md:justify-start focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
              >
                Upgrade now
                <ChevronRightIcon className="ml-2 md:ml-3 w-4 md:w-5 h-4 md:h-5 text-indigo-600" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Filter and Sort Bar */}
        <motion.div
          className="flex flex-col md:flex-row justify-between mb-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Filters */}
          <motion.div
            className="flex items-center space-x-4"
            variants={cardVariants}
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center space-x-2 h-9 bg-white dark:bg-neutral-900 dark:border-neutral-700 text-gray-700 dark:text-gray-200"
                >
                  <FilterIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  <span>Filters</span>
                </Button>
              </DialogTrigger>
              <DialogContent
                className={`w-[18rem] sm:w-[30rem] md:w-[50rem] bg-white dark:bg-neutral-900 dark:ring-neutral-200 dark:border-neutral-700 ${GeistSans.className}`}
              >
                <DialogHeader>
                  <DialogTitle className="text-black dark:text-white">
                    Filter Courses
                  </DialogTitle>
                  <DialogDescription>
                    Refine your search by applying the following filters.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  {/* Access Level Filters */}
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Access Level
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox
                        id="premium"
                        checked={selectedAccessLevels.includes("premium")}
                        onCheckedChange={() =>
                          handleAccessLevelChange("premium")
                        }
                        aria-label="Filter by Premium Access Level"
                      />
                      <label
                        htmlFor="premium"
                        className="ml-2 text-sm text-gray-700 dark:text-gray-200"
                      >
                        Premium
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="free"
                        checked={selectedAccessLevels.includes("free")}
                        onCheckedChange={() => handleAccessLevelChange("free")}
                        aria-label="Filter by Free Access Level"
                      />
                      <label
                        htmlFor="free"
                        className="ml-2 text-sm text-gray-700 dark:text-gray-200"
                      >
                        Free
                      </label>
                    </div>
                  </div>

                  {/* Duration Filters */}
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mt-4 mb-2">
                    Duration
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox
                        id="0-30"
                        checked={selectedDurations.includes("0-30")}
                        onCheckedChange={() => handleDurationChange("0-30")}
                        aria-label="Filter by Duration 0-30 minutes"
                      />
                      <label
                        htmlFor="0-30"
                        className="ml-2 text-sm text-gray-700 dark:text-gray-200"
                      >
                        0-30 mins
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="30-60"
                        checked={selectedDurations.includes("30-60")}
                        onCheckedChange={() => handleDurationChange("30-60")}
                        aria-label="Filter by Duration 30 minutes to 1 hour"
                      />
                      <label
                        htmlFor="30-60"
                        className="ml-2 text-sm text-gray-700 dark:text-gray-200"
                      >
                        30 mins - 1 hour
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="1-2h"
                        checked={selectedDurations.includes("1-2h")}
                        onCheckedChange={() => handleDurationChange("1-2h")}
                        aria-label="Filter by Duration 1 hour to 2 hours"
                      />
                      <label
                        htmlFor="1-2h"
                        className="ml-2 text-sm text-gray-700 dark:text-gray-200"
                      >
                        1 hour - 2 hours
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="above-2h"
                        checked={selectedDurations.includes("above-2h")}
                        onCheckedChange={() => handleDurationChange("above-2h")}
                        aria-label="Filter by Duration Above 2 hours"
                      />
                      <label
                        htmlFor="above-2h"
                        className="ml-2 text-sm text-gray-700 dark:text-gray-200"
                      >
                        Above 2 hours
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleClearAll}
                    disabled={
                      selectedAccessLevels.length === 0 &&
                      selectedDurations.length === 0
                    }
                  >
                    Clear All
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Sort Dropdown */}
            <motion.div
              className="relative inline-block text-left w-48"
              variants={cardVariants}
            >
              <Select
                value={selectedSort}
                onValueChange={(value: string) => handleSortChange(value)}
              >
                <SelectTrigger className="w-full bg-white dark:bg-neutral-900 dark:border-neutral-700 text-gray-700 dark:text-gray-200 h-9">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-neutral-900 dark:border-neutral-700 text-gray-700 dark:text-gray-200">
                  <SelectItem
                    value="relevancy"
                    className="hover:dark:bg-neutral-800 dark:text-gray-200 dark:bg-neutral-900"
                  >
                    Relevancy
                  </SelectItem>
                  <SelectItem
                    value="rating-up"
                    className="hover:dark:bg-neutral-800 dark:text-gray-200 dark:bg-neutral-900"
                  >
                    Highest Rated
                  </SelectItem>
                  <SelectItem
                    value="rating-down"
                    className="hover:dark:bg-neutral-800 dark:text-gray-200 dark:bg-neutral-900"
                  >
                    Lowest Rated
                  </SelectItem>
                  <SelectItem
                    value="created-up"
                    className="hover:dark:bg-neutral-800 dark:text-gray-200 dark:bg-neutral-900"
                  >
                    Most Recently Added
                  </SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="text-center text-gray-500 dark:text-gray-200">
            Loading courses...
          </div>
        )}

        {/* Continue Practicing Section */}
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* TODO */}
          {/*
          <h2 className="font-bold mb-6 text-2xl text-black dark:text-white">
            Continue Practicing
          </h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >

            Hardcoded Practiced Course Cards
            {courses.slice(0, 2).map((course) => (
              <motion.div
                key={course._id}
                className="flex"
                variants={cardVariants}
              >
                <Card className="w-full bg-gray-200 dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden">
                  <Image
                    src={course.previewImage.asset.url || Placeholder}
                    alt={course.previewImage.alt || course.title}
                    width={400}
                    height={225}
                    className="w-full h-40 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {course.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>*/}
        </motion.div>

        {/* Your Courses Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <h3 className="font-bold mb-6 text-2xl text-black dark:text-white">
            Your Courses
          </h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {filteredCourses.map((course) => (
              <motion.div
                key={course._id}
                className="bg-gray-100 dark:bg-neutral-800 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
                onClick={() =>
                  (window.location.href = `/courses/${course.slug.current}`)
                }
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src={course.previewImage.asset.url || Placeholder}
                  alt={course.previewImage.alt || course.title}
                  width={400}
                  height={225}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {course.title}
                    </h2>
                    <span
                      className={cn(
                        "text-xs font-semibold uppercase px-2 py-1 rounded-full",
                        {
                          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200":
                            course.accessLevel === "premium",
                          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200":
                            course.accessLevel === "free",
                        }
                      )}
                    >
                      {course.accessLevel.charAt(0).toUpperCase() +
                        course.accessLevel.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                    {course.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-4">
                    <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                      <Clock4Icon className="h-5 w-5" />
                      <span className="text-sm">{course.duration}</span>
                    </div>
                    {course.rating && (
                      <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                        <CircleDollarSignIcon className="h-5 w-5" />
                        <span className="text-sm">{course.rating}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </motion.div>
            ))}

            {/* Optionally, display a message if no courses match the filters */}
            {!isLoading && filteredCourses.length === 0 && (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-200">
                No courses match the selected filters.
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Load More Button (Commented Out Since Functionality is Removed)
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" disabled>
            Load More
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default CoursesPage;
