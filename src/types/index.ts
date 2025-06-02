export interface TraitOption {
  id: string;
  name: string;
  imagePath: string; // Changed from svgContent to imagePath for PNG images
  category: TraitCategoryName;
}

export type TraitCategoryName =
  | "Background"
  | "Body"
  | "Clothes"
  | "Eyes"
  | "Mouth"
  | "Head"
  | "Earring";

export interface TraitCategory {
  id: TraitCategoryName;
  name: string;
  options: TraitOption[];
  defaultOptionId: string;
  zIndex: number; // For layering
}

export type SelectedTraits = {
  [key in TraitCategoryName]: string; // Stores the selected option ID for each category
};

export const TRAIT_CATEGORIES_ORDER: TraitCategoryName[] = [
  "Background",
  "Body",
  "Clothes",
  "Mouth",
  "Eyes",
  "Earring",
  "Head",
];
