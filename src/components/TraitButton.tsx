"use client";
import React from 'react';
import { TraitOption } from '@/types';
import { cn } from '@/lib/utils';

interface TraitButtonProps {
  option: TraitOption;
  isSelected: boolean;
  onSelect: () => void;
}

const TraitButton: React.FC<TraitButtonProps> = ({ option, isSelected, onSelect }) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "p-2 border rounded-md hover:bg-slate-600 transition-colors w-full text-left flex flex-col items-center",
        isSelected ? "bg-sky-600 border-sky-400 ring-2 ring-sky-400" : "bg-slate-700 border-slate-600"
      )}
      title={option.name}
    >
      <div className="w-16 h-16 mb-1 border border-slate-500 rounded bg-slate-800 overflow-hidden flex items-center justify-center">
        <img
          src={option.imagePath}
          alt={option.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
      </div>
      <span className="text-xs text-center truncate w-full">{option.name}</span>
    </button>
  );
};

export default TraitButton;
