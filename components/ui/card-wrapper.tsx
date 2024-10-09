"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GeistSans } from "geist/font/sans";

interface CardWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <Card
      className={`z-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl shadow-input bg-white dark:bg-black ${GeistSans.className} border border-neutral-200 dark:border-neutral-800`}
    >
      <CardHeader>
        <CardTitle className="font-bold text-xl text-black dark:text-neutral-200">
          {title}
        </CardTitle>
        <CardDescription className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="-mt-6">{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
