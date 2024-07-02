import React from "react";
import "./background-grid-line.style.css"

import { cn } from "@/lib/utils";

interface BackgroundGridLineProps {
  className?: string;
}

const BackgroundGridLine: React.FC<BackgroundGridLineProps> = ({ className }) => {
  return <div className={cn("background-grid-line absolute left-0 right-0 top-0 bottom-0 -z-50", className)}></div>;
};

export default BackgroundGridLine;
