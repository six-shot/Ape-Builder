
import React from 'react';
import { TraitCategory, TraitOption, SelectedTraits, TraitCategoryName } from '@/types';
import TraitButton from './TraitButton';

interface TraitSelectorGroupProps {
  category: TraitCategory;
  selectedOptionId: string;
  onTraitSelect: (category: TraitCategoryName, optionId: string) => void;
}

const TraitSelector: React.FC<TraitSelectorGroupProps> = ({ category, selectedOptionId, onTraitSelect }) => {
  return (
    <div className="mb-6 p-4 bg-slate-800 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3 text-sky-300">{category.name}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
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
