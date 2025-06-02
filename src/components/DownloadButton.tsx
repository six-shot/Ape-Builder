import React from "react";
import { SelectedTraits } from "@/types";
import { ALL_TRAIT_CATEGORIES } from "@/data/traits";

interface DownloadButtonProps {
  selectedTraits: SelectedTraits;
  size?: number;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  selectedTraits,
  size = 300,
}) => {
  const handleDownload = async () => {
    // Create a canvas element
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Load all selected trait images
    const imagePromises = Object.entries(selectedTraits).map(
      async ([categoryName, optionId]) => {
        const category = ALL_TRAIT_CATEGORIES.find(
          (c) => c.id === categoryName
        );
        const option = category?.options.find((opt) => opt.id === optionId);
        if (!option?.imagePath) return null;

        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = option.imagePath;
        });
      }
    );

    try {
      // Wait for all images to load
      const images = await Promise.all(imagePromises);

      // Draw each image on the canvas in the correct order
      images.forEach((img, index) => {
        if (img) {
          const categoryName = Object.keys(selectedTraits)[index];
          const category = ALL_TRAIT_CATEGORIES.find(
            (c) => c.id === categoryName
          );
          ctx.globalCompositeOperation = "source-over";
          ctx.drawImage(img, 0, 0, size, size);
        }
      });

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ape-custom.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, "image/png");
    } catch (error) {
      console.error("Error creating image:", error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
      Download Ape
    </button>
  );
};

export default DownloadButton;
