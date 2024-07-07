import ApiManager from "@/ApiManager/ApiManager";
import { useToast } from "@/components/ui/use-toast";
// import { useState } from "react";
import { DetectionResponseData, IResponseDetection } from "@/types/DetectionObject";
import { convertResPredict2DetectionObject } from "@/lib/utils";
import { usePredictionImage } from "@/lib/zustand/usePredictionImage";

const usePredictImage = () => {
  const { toast } = useToast();
  const { setDetections, setImageDetection, setLoading, loading } = usePredictionImage();

  const predict = async (img: File) => {
    setLoading(true);
    setDetections(null);
    setImageDetection(null);
    try {
      const formData = new FormData();
      const reader = new FileReader();

      formData.append("image", img);

      const model = "fold-3";
      const res = await ApiManager.predictImage(formData, model);
      const data = res.data as IResponseDetection;

      const detections = convertResPredict2DetectionObject(data.data as DetectionResponseData);
      setDetections(detections);
      console.log(detections);

      reader.readAsDataURL(img);
      reader.onload = () => setImageDetection(reader.result as string);

      toast({ description: `Image has benn successfully detected 🎉` });
    } catch (error: unknown) {
      if (error instanceof Error) console.error("Error on usePredictedImage : ", error.message);
      toast({
        description: "Server Error",
      });
      setLoading(false);
    } finally {
      toast({
        description: "please wait a moment...",
      });
    }
  };

  return { predict, loading };
};

export default usePredictImage;
