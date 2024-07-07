// {boxes: [[int, int, int, int], ...], lables: [string, ...], scores: [int, ...] }

import { Response } from "./Response";

export type modelType = "fold-1" | "fold-2" | "fold-3";

export type labelType = "spatter" | "undercut";

export type scoreType = number;

export type boxType = [number, number, number, number];

export type boundingBoxType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export interface IDetectionObject {
  label: labelType;
  confidence: scoreType;
  boundingBox: boundingBoxType;
}

export type DetectionResponseData = {
  labels: labelType[];
  scores: scoreType[];
  boxes: boxType[];
};

export interface IResponseDetection extends Response<DetectionResponseData> {}
