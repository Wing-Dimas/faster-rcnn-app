import React from "react";
import "./grid-line.style.css";

import { cn } from "@/lib/utils";

interface GridLineProps {
  className?: string;
}

const GridLine: React.FC<GridLineProps> = ({ className }) => {
  return <div className={cn("gridLine", className)}></div>;
};

export default GridLine;
