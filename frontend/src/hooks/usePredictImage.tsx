import ApiManager from "@/ApiManager/ApiManager";
import { useToast } from "@/components/ui/use-toast";

const usePredictImage = () => {
  const loading = false;
  const { toast } = useToast();

  const predict = async (img: File) => {
    try {
      const formData = new FormData();
      formData.append("image", img);

      const res = await ApiManager.predictImage(formData);
      console.log(res);
    } catch (error: unknown) {
      if (error instanceof Error) console.error("Error on usePredictedImage : ", error.message);
      toast({
        description: "Server Error",
      });
    }
  };

  return { predict, loading };
};

export default usePredictImage;
