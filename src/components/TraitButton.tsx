"use client";
import React from "react";
import { TraitOption } from "@/types";
import { cn } from "@/lib/utils";

interface TraitButtonProps {
  option: TraitOption;
  isSelected: boolean;
  onSelect: () => void;
}

const TraitButton: React.FC<TraitButtonProps> = ({
  option,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      onClick={onSelect}
      className={`relative group p-4 rounded-xl transition-all duration-200 ${
        isSelected
          ? "bg-[#FBF6C1]/20 border-2 border-[#FBF6C1]"
          : "bg-zinc-800/50 border-2 border-transparent hover:border-[#FBF6C1]/50"
      }`}
    >
      <div className="aspect-square w-full relative overflow-hidden rounded-lg">
        <img
          src={option.imagePath}
          alt={option.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
      </div>
      <div className="mt-3 text-center">
        <p className="text-base font-medium text-zinc-200">{option.name}</p>
      </div>
      {isSelected && (
        <div className="absolute top-4 right-4 w-6 h-6 bg-[#FBF6C1] rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}
    </button>
  );
};

export default TraitButton;
