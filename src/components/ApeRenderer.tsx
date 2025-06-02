import React from "react";
import { SelectedTraits, TraitOption, TRAIT_CATEGORIES_ORDER } from "@/types";
import { ALL_TRAIT_CATEGORIES } from "@/data/traits";

interface ApeRendererProps {
  selectedTraits: SelectedTraits;
  size?: number;
}

const ApeRenderer: React.FC<ApeRendererProps> = ({
  selectedTraits,
  size = 300,
}) => {
  const getTraitOption = (
    categoryName: keyof SelectedTraits,
    optionId: string
  ): TraitOption | undefined => {
    const category = ALL_TRAIT_CATEGORIES.find((c) => c.id === categoryName);
    return category?.options.find((opt) => opt.id === optionId);
  };

  return (
    <div
      className="relative bg-slate-800/30 rounded-xl shadow-2xl overflow-hidden border border-slate-700/30"
      style={{ width: size, height: size }}
    >
      {TRAIT_CATEGORIES_ORDER.map((categoryName) => {
        const selectedOptionId = selectedTraits[categoryName];
        if (!selectedOptionId) return null;

        const traitOption = getTraitOption(categoryName, selectedOptionId);
        if (!traitOption || !traitOption.imagePath) return null;

        const categoryData = ALL_TRAIT_CATEGORIES.find(
          (c) => c.id === categoryName
        );

        return (
          <img
            key={categoryName}
            src={traitOption.imagePath}
            alt={`${categoryName}: ${traitOption.name}`}
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ zIndex: categoryData?.zIndex }}
            onError={(e) => {
              // Hide broken images
              e.currentTarget.style.display = "none";
            }}
          />
        );
      })}
    </div>
  );
};

export default ApeRenderer;
