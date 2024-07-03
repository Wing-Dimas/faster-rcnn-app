import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CloudUploadIcon, Loader2 } from "lucide-react";
import { usePredictImage } from "@/hooks";

export const ImageUploader: React.FC = () => {
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>("");
  const { toast } = useToast();
  const { predict } = usePredictImage();

  const formSchema = z.object({
    image: z
      //Rest of validations done via react dropzone
      .instanceof(File)
      .refine((file) => file.size !== 0, "Please upload an image"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      image: new File([""], "filename"),
    },
  });

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.readAsDataURL(acceptedFiles[0]);
        reader.onload = () => setPreview(reader.result);
        form.setValue("image", acceptedFiles[0]);
        form.clearErrors("image");
      } catch (error) {
        setPreview(null);
        form.resetField("image");
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 16 * 1024 * 1024,
    accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    predict(values.image);
    toast({ description: `Image uploaded successfully 🎉 ${values.image.name}` });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card>
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <CardHeader>
                  <FormLabel className={`${fileRejections.length !== 0 && "text-destructive"}`}>
                    <CardTitle className="text-xl font-semibold tracking-tight">Upload your image</CardTitle>
                    <CardDescription>
                      Drag and drop your images or click the button below to select files.
                      <span
                        className={
                          form.formState.errors.image || fileRejections.length !== 0
                            ? "text-destructive"
                            : "text-muted-foreground"
                        }
                      ></span>
                    </CardDescription>
                  </FormLabel>
                </CardHeader>
                <CardContent>
                  <FormControl>
                    <div
                      {...getRootProps()}
                      className={`flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg p-10 space-y-6 ${
                        isDragActive && "bg-white/20"
                      }`}
                    >
                      {preview && (
                        <img src={preview as string} alt="Uploaded image" className="max-h-[400px] rounded-lg" />
                      )}
                      <CloudUploadIcon
                        className={`w-16 h-16 text-zinc-500 dark:text-zinc-400 ${preview ? "hidden" : "block"}`}
                      />
                      <Input {...getInputProps()} type="file" />
                      {isDragActive ? <p>Drop the image!</p> : <p>Click here or drag an image to upload it</p>}
                    </div>
                  </FormControl>
                  <FormMessage>
                    {fileRejections.length !== 0 && <>Image must be less than 16MB and of type png, jpg, or jpeg</>}
                  </FormMessage>
                </CardContent>
              </FormItem>
            )}
          />
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={form.formState.isSubmitting} size="sm" className="gap-2">
              <Loader2 size={16} className="hidden" />
              Generate
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
