import React from "react";
import { Hero } from "@/components/atomics";
import { ImageUploader } from "@/components/molecules";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <Hero />

      {/* UPLOAD FILE */}
      <div className="mt-28">
        <ImageUploader />
      </div>

      {/* RESULT GENERATE */}
    </div>
  );
};

export default Home;
