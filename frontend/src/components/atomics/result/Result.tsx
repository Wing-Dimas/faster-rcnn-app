import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Result: React.FC = () => {
  const loading = true;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Result</CardTitle>
        <CardDescription>This</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 flex-wrap">
          {loading && Array.from({ length: 3 }, (_, i) => <SkeletonCard key={i} />)}

          {!loading && (
            <>
              <ResultItem />
              <ResultItem />
              <ResultItem />
            </>
          )}
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
    <Card className="min-w-60 flex-1">
      <AspectRatio ratio={1 / 1}>
        <Skeleton className="w-full h-full" />
      </AspectRatio>
    </Card>
  );
};
export default Result;
