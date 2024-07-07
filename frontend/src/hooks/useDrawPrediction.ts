import { useEffect, useState } from "react";
import { IDetectionObject } from "@/types/DetectionObject";
import { imageType, usePredictionImage } from "@/lib/zustand/usePredictionImage";

const useDrawPrediction = (img: imageType, detectionObjects: IDetectionObject[]) => {
  const [imageResizedUrl, setImageResizedUrl] = useState<imageType>(null);
  const { setLoading } = usePredictionImage();

  useEffect(() => {
    if (img) {
      setLoading(true);
      resizeImage(img, detectionObjects, 400, 400).then((result) => {
        setImageResizedUrl(result as unknown as string);
        setLoading(false);
      });
    }
  }, [img, detectionObjects, setLoading]);

  return { imageResizedUrl };
};

function resizeImage(base64Str: imageType, detectionObjects: IDetectionObject[], maxWidth = 400, maxHeight = 300) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = base64Str as string;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const MAX_WIDTH = maxWidth;
      const MAX_HEIGHT = maxHeight;
      let width = image.width;
      let height = image.height;

      let shouldResize = false;
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
          shouldResize = true;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
          shouldResize = true;
        }
      }

      if (!ctx) return;

      const scale_x = width / image.width;
      const scale_y = height / image.height;
      if (shouldResize) {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, 0, 0, width, height);
        drawBoundingBox(ctx, detectionObjects, scale_x, scale_y);
        resolve(canvas.toDataURL("image/jpeg", 0.9));
      } else {
        ctx.drawImage(image, 0, 0, image.width, image.height);
        drawBoundingBox(ctx, detectionObjects, scale_x, scale_y);
        resolve(canvas.toDataURL("image/jpeg", 0.9));
      }
    };
  });
}

const drawBoundingBox = (
  ctx: CanvasRenderingContext2D,
  detectionObjects: IDetectionObject[],
  scale_x: number,
  scale_y: number
) => {
  detectionObjects.forEach((detection) => {
    const { label, boundingBox } = detection;
    const { x, y, width, height } = boundingBox;

    // create boudngin box
    const newX = x * scale_x;
    const newY = y * scale_y;
    const newWidth = width * scale_x;
    const newHeight = height * scale_y;

    ctx.strokeStyle = { spatter: "red", undercut: "cyan" }[label];
    ctx.lineWidth = 5;
    ctx.strokeRect(newX, newY, newWidth, newHeight);
  });
};

export default useDrawPrediction;
