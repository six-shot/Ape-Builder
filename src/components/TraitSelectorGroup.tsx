import React from "react";
import {
  TraitCategory,
  TraitOption,
  SelectedTraits,
  TraitCategoryName,
} from "@/types";
import TraitButton from "./TraitButton";

interface TraitSelectorGroupProps {
  category: TraitCategory;
  selectedOptionId: string;
  onTraitSelect: (category: TraitCategoryName, optionId: string) => void;
}

const TraitSelector: React.FC<TraitSelectorGroupProps> = ({
  category,
  selectedOptionId,
  onTraitSelect,
}) => {
  return (
    <div className="mb-6 p-6 bg-zinc-900/80 rounded-xl shadow-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-200">
      <h3 className="text-xl font-bold mb-4 text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
        {category.name}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {category.options.map((option) => (
          <TraitButton
            key={option.id}
            option={option}
            isSelected={selectedOptionId === option.id}
            onSelect={() => onTraitSelect(category.id, option.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TraitSelector;
