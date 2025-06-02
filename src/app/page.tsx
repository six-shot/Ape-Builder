"use client";
import React, { useState } from "react";
import { Shuffle } from "lucide-react";
import ApeRenderer from "@/components/ApeRenderer";
import DownloadButton from "@/components/DownloadButton";
import { ALL_TRAIT_CATEGORIES, getDefaultTraits } from "@/data/traits";
import { SelectedTraits, TraitCategoryName } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TraitButton from "@/components/TraitButton";

export default function Home() {
  const [selectedTraits, setSelectedTraits] = useState<SelectedTraits>(
    getDefaultTraits()
  );
  const [activeTab, setActiveTab] = useState(ALL_TRAIT_CATEGORIES[0].id);

  const handleTraitSelect = (category: TraitCategoryName, optionId: string) => {
    setSelectedTraits((prevTraits) => ({
      ...prevTraits,
      [category]: optionId,
    }));
  };

  const handleRandomize = () => {
    const newTraits: Partial<SelectedTraits> = {};
    ALL_TRAIT_CATEGORIES.forEach(({ id, options }) => {
      const randomIndex = Math.floor(Math.random() * options.length);
      newTraits[id] = options[randomIndex].id;
    });
    setSelectedTraits(newTraits as SelectedTraits);
  };
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 flex flex-col relative">
      {/* Add the noise background */}
      <div
        className="absolute inset-0  pointer-events-none"
        style={{
          backgroundImage: 'url("/noise-dark.webp")',
          backgroundRepeat: "repeat",
        }}
      />

      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8 relative z-10">
        {/* Left Column: Controls & Randomize Button */}
        <div className="lg:w-2/3 order-2 lg:order-1">
          <div className="flex justify-end mb-6">
            <button
              onClick={handleRandomize}
              className="px-6 py-3 bg-[#FBF6C1] hover:bg-[#FBF6C1]/90 text-black font-semibold rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer transform hover:scale-105"
            >
              <Shuffle size={20} className="mr-2" />
              Randomize Traits
            </button>
          </div>

          <Tabs
            defaultValue={activeTab}
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as TraitCategoryName)}
            className="w-full"
          >
            <div className="flex gap-6">
              {/* Vertical Tabs List */}
              <TabsList className="flex flex-col h-fit bg-zinc-900/80 rounded-lg p-2 gap-2">
                {ALL_TRAIT_CATEGORIES.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="w-[130px] px-4 py-3 text-left data-[state=active]:bg-[#FBF6C1] data-[state=active]:text-black rounded-md transition-all "
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Tabs Content */}
              <div className="flex-1">
                {ALL_TRAIT_CATEGORIES.map((category) => (
                  <TabsContent
                    key={category.id}
                    value={category.id}
                    className="mt-0"
                  >
                    <div className="bg-zinc-900/80 p-6 rounded-xl border border-zinc-800">
                      <h3 className="text-xl font-bold mb-6 text-[#FBF6C1]">
                        {category.name}
                      </h3>
                      <div className="max-h-[calc(100vh-300px)] overflow-y-auto pr-2 custom-scrollbar">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {category.options.map((option) => (
                            <TraitButton
                              key={option.id}
                              option={option}
                              isSelected={
                                selectedTraits[category.id] === option.id
                              }
                              onSelect={() =>
                                handleTraitSelect(category.id, option.id)
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </div>
            </div>
          </Tabs>
        </div>

        {/* Right Column: Ape Preview */}
        <div className="lg:w-1/3 order-1 lg:order-2 flex flex-col items-center lg:items-start lg:sticky lg:top-8">
          <h2 className="text-3xl font-bold mb-6 text-center lg:text-left text-[#FBF6C1]">
            Your Ape
          </h2>
          <div className="bg-zinc-900/80 p-6 rounded-2xl shadow-2xl border border-zinc-800">
            <ApeRenderer selectedTraits={selectedTraits} size={320} />
            <div className="mt-6 w-full flex justify-center">
              <DownloadButton selectedTraits={selectedTraits} size={320} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
