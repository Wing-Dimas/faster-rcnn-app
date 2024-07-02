import React from "react";
import GridLine from "../grid-line/GridLine";

import "./hero.style.css";

const Hero: React.FC = () => {
  return (
    <div className="mt-28 relative">
      <GridLine />
      <h1 className="font-bold text-center title text-accent-foreground relative my-8">
        The Weld Defect Detection Using Faster R-CNN
      </h1>
      <GridLine />
      <div className="py-6 mx-12 sm:mx-36 lg:mx-60 font-medium">
        <p className="text-center text-accent-foreground lead">
          Elevate your welding standards with our AI-powered Faster R-CNN defect detection solution.
        </p>
      </div>
      <GridLine />
    </div>
  );
};

export default Hero;
