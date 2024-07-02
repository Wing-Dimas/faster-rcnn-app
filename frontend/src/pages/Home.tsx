import React from "react";
import { Hero, Result } from "@/components/atomics";
import { ImageUploader } from "@/components/molecules";
import { Separator } from "@/components/ui/separator";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <Hero />

      {/* UPLOAD FILE */}
      <div className="mt-28 px-4">
        <ImageUploader />
      </div>
      <div className="flex h-8 justify-between px-8 ">
        <Separator orientation="vertical" className="w-px" />
        <Separator orientation="vertical" className="w-px" />
      </div>
      {/* RESULT GENERATE */}
      <div className="px-4">
        <Result />
      </div>
    </div>
  );
};

export default Home;
