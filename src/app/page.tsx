"use client";
import React, { useState } from "react";
import { Shuffle } from "lucide-react";

import ApeRenderer from "@/components/ApeRenderer";
import TraitSelectorGroup from "@/components/TraitSelectorGroup";
import DownloadButton from "@/components/DownloadButton";
// shadcn button
import { ALL_TRAIT_CATEGORIES, getDefaultTraits } from "@/data/traits";
import { SelectedTraits, TraitCategoryName } from "@/types";

export default function Home() {
  const [selectedTraits, setSelectedTraits] = useState<SelectedTraits>(
    getDefaultTraits()
  );

  const handleTraitSelect = (category: TraitCategoryName, optionId: string) => {
    setSelectedTraits((prevTraits) => ({
      ...prevTraits,
      [category]: optionId,
    }));
  };

  const handleRandomize = () => {
    const newTraits: Partial<SelectedTraits> = {};
    ALL_TRAIT_CATEGORIES.forEach((category) => {
      const randomIndex = Math.floor(Math.random() * category.options.length);
      newTraits[category.id] = category.options[randomIndex].id;
    });
    setSelectedTraits(newTraits as SelectedTraits);
  };
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        {/* Left Column: Controls & Randomize Button */}
        <div className="lg:w-2/3 order-2 lg:order-1">
          <div className="flex justify-end mb-6">
            <button
              onClick={handleRandomize}
              className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2 cursor-pointer"
            >
              <Shuffle size={20} className="mr-2" />
              Randomize Traits
            </button>
          </div>
          <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
            {ALL_TRAIT_CATEGORIES.map((category) => (
              <TraitSelectorGroup
                key={category.id}
                category={category}
                selectedOptionId={selectedTraits[category.id]}
                onTraitSelect={handleTraitSelect}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Ape Preview */}
        <div className="lg:w-1/3 order-1 lg:order-2 flex flex-col items-center lg:items-start lg:sticky lg:top-8">
          <h2 className="text-2xl font-semibold mb-4 text-center lg:text-left">
            Your Ape
          </h2>
          <ApeRenderer selectedTraits={selectedTraits} size={320} />
          <div className="mt-6 w-full flex justify-center">
            <DownloadButton selectedTraits={selectedTraits} size={320} />
          </div>
        </div>
      </main>
    </div>
  );
}
