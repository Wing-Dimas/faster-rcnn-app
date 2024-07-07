import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { imageType, usePredictionImage } from "@/lib/zustand/usePredictionImage";
import { IDetectionObject } from "@/types/DetectionObject";
import { useDrawPrediction } from "@/hooks";
import { cn } from "@/lib/utils";

type labelDetailOptions = {
  [key: string]: number;
};

const Result: React.FC = () => {
  const { loading, image } = usePredictionImage();

  return (
    <Card id="result">
      <CardHeader>
        <CardTitle>Result</CardTitle>
        <CardDescription>Predict will show on below</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex">
          {loading && <SkeletonCard />}

          {image && <ResultPredict />}
        </div>
      </CardContent>
    </Card>
  );
};

const ResultPredict: React.FC = () => {
  const { image, detections, loading } = usePredictionImage();
  const { imageResizedUrl } = useDrawPrediction(image as imageType, detections as IDetectionObject[]);

  const labelDetail: labelDetailOptions = detections?.reduce(
    (labelDetail, item) => {
      labelDetail[item.label] = (labelDetail[item.label] || 0) + 1;
      return labelDetail;
    },
    { spatter: 0, undercut: 0 }
  ) || { spatter: 0, undercut: 0 };

  return (
    <Card className="min-w-60 flex-1">
      <CardHeader></CardHeader>
      <CardContent className="relative">
        {!loading && imageResizedUrl && (
          <div className="w-full">{imageResizedUrl && <img src={imageResizedUrl as string} className="mx-auto" />}</div>
        )}

        <div className="mt-4 flex gap-2">
          {labelDetail &&
            Object.keys(labelDetail).map((label, i) => {
              if (labelDetail[label as keyof labelDetailOptions]) {
                return (
                  <Badge variant="outline" className="flex gap-3 max-w-max py-2 items-center" key={i}>
                    <div
                      className={cn(
                        "w-3 h-3 rounded-full bg-red-600",
                        label == "spatter" ? "bg-red-600" : "bg-cyan-300"
                      )}
                    ></div>{" "}
                    <span>{label}</span>
                    <span className="ml2 text-slate-600">{labelDetail[label as keyof labelDetailOptions]}</span>
                  </Badge>
                );
              }
            })}
        </div>
      </CardContent>
    </Card>
  );
};

const SkeletonCard = () => {
  return (
    <Card className="min-w-60 flex-1 relative">
      <AspectRatio ratio={16 / 9} className="relative">
        <Skeleton className="w-full h-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h3 className="text-center">Your image is being porcessed</h3>
          <p className="text-center">please wait a moment...</p>
        </div>
      </AspectRatio>
    </Card>
  );
};
export default Result;
