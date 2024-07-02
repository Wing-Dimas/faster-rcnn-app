import React from "react";
import BackgroundGridLine from "../background-grid-line/BackgroundGridLine";

import "./hero.style.css";

const Hero: React.FC = () => {
  return (
    <div className="relative">
      <div className="mt-28 relative z-10 px-4">
        <h1 className="font-bold text-center title text-accent-foreground relative my-8">
          The Weld Defect Detection Using Faster R-CNN
        </h1>
        <div className="py-6 mx-12 sm:mx-36 lg:mx-60 font-medium">
          <p className="text-center text-accent-foreground lead">
            Elevate your welding standards with our AI-powered Faster R-CNN
            defect detection solution.
          </p>
        </div>
      </div>
      <BackgroundGridLine className="scale-125 scale-y-150 md:scale-150 translate-y-10" />
    </div>
  );
};

export default Hero;
