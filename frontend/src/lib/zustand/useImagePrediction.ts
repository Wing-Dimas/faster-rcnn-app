import { create } from "zustand";

interface ImagePredictionState {
  image?: FileReader | null;
  setImagePredcition: (image: FileReader) => void;
}

const useImagePrediciton = create<ImagePredictionState>((set) => ({
  image: null,
  setImagePredcition: (img: FileReader) => set(() => ({ image: img })),
}));

export { type ImagePredictionState, useImagePrediciton };
