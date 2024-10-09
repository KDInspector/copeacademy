// app/recreate/components/ComponentSelector.tsx

"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

interface ComponentSelectorProps {
  title: string;
  options: { url: string; label: string }[];
  selected: string | null;
  onSelect: (value: string) => void;
}

const ComponentSelector: React.FC<ComponentSelectorProps> = ({
  title,
  options,
  selected,
  onSelect,
}) => {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">{title}</label>
      <Select onValueChange={onSelect} value={selected || ""}>
        <SelectTrigger className="w-64">
          <SelectValue placeholder={`Choose ${title.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={index} value={option.url}>
              <Image
                width={100}
                height={100}
                src={option.url}
                alt={`${title} ${index + 1}`}
                className="w-10 h-10 object-contain mr-2"
              />
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ComponentSelector;
