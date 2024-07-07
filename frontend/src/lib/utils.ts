import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  DetectionResponseData,
  IDetectionObject,
  boxType,
  boundingBoxType,
  labelType,
  scoreType,
} from "@/types/DetectionObject";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertResPredict2DetectionObject(data: DetectionResponseData): IDetectionObject[] {
  const { boxes, labels, scores } = data;
  const shortestLength = Math.min(boxes.length, labels.length, scores.length);

  const zipped = [];
  for (let i = 0; i < shortestLength; i++) {
    zipped.push([boxes[i], labels[i], scores[i]]);
  }

  const detections: IDetectionObject[] = zipped.map((detection) => {
    const box = detection[0] as boxType;
    const label = detection[1] as labelType;
    const scores = detection[2] as scoreType;

    const width = box[0] + box[2];
    const height = box[1] + box[3];

    const boundingBox: boundingBoxType = {
      x: box[0],
      y: box[1],
      width,
      height,
    };

    const detectionObject: IDetectionObject = {
      label,
      boundingBox,
      confidence: scores,
    };

    return detectionObject;
  });

  return detections;
}
