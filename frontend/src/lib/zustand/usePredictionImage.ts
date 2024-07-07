import { create } from "zustand";
import { type IDetectionObject } from "@/types/DetectionObject";

export type imageType = string | ArrayBuffer | null;

interface IPredictionImageState {
  image?: imageType;
  detections?: IDetectionObject[] | null;
  loading: boolean;
  setImageDetection: (image: imageType) => void;
  setDetections: (detections: IDetectionObject[] | null) => void;
  setLoading: (loading: boolean) => void;
}

const usePredictionImage = create<IPredictionImageState>((set) => ({
  image: null,
  detections: null,
  loading: false,
  setImageDetection: (image: imageType | null) => set(() => ({ image })),
  setDetections: (detections: IDetectionObject[] | null) => set(() => ({ detections })),
  setLoading: (loading: boolean) => set(() => ({ loading: loading })),
}));

export { type IPredictionImageState, usePredictionImage };
