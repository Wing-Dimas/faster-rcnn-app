import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Result: React.FC = () => {
    const loading = true
  return (
    <Card>
      <CardHeader>
        <CardTitle>Result</CardTitle>
        <CardDescription>This</CardDescription>
      </CardHeader>
      <CardContent>
        {loading && Array.from({length: 3}, (_, i) => <SkeletonCard key={i} />) }

        <div className="flex gap-3 flex-wrap">
          <ResultItem />
          <ResultItem />
          <ResultItem />
        </div>
      </CardContent>
    </Card>
  );
};

const ResultItem: React.FC = () => {
  return (
    <Card className="min-w-60 flex-1">
      <CardContent>
        <AspectRatio ratio={1 / 1}>
          <div className="w-full"></div>
        </AspectRatio>
      </CardContent>
    </Card>
  );
};

const SkeletonCard = () => {
  return (
    
            <Skeleton className="flex-1 rounded-xl" />

  );
};
export default Result;
