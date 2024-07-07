import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { imageType, usePredictionImage } from "@/lib/zustand/usePredictionImage";
import { IDetectionObject } from "@/types/DetectionObject";
import { useDrawPrediction } from "@/hooks";

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

  return (
    <Card className="min-w-60 flex-1">
      <CardHeader></CardHeader>
      <CardContent className="relative">
        {!loading && imageResizedUrl && (
          <div className="w-full">{imageResizedUrl && <img src={imageResizedUrl as string} className="mx-auto" />}</div>
        )}
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
